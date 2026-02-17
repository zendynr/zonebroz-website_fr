import { supabase } from "./supabase";
import { AnalysisMedia } from "../types";

const ANALYSIS_MEDIA_BUCKET = "analysis-media";

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

function inferMediaType(mimeType: string): "image" | "video" {
  if (mimeType.startsWith("video/")) return "video";
  return "image";
}

export async function uploadAnalysisSectionMedia(params: {
  reportId: string;
  sectionId: string;
  file: File;
}): Promise<AnalysisMedia> {
  const { reportId, sectionId, file } = params;
  const safeName = sanitizeFileName(file.name || "upload");
  const storagePath = `reports/${reportId}/sections/${sectionId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(ANALYSIS_MEDIA_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    throw new Error(uploadError.message || "Failed to upload media.");
  }

  const { data } = supabase.storage
    .from(ANALYSIS_MEDIA_BUCKET)
    .getPublicUrl(storagePath);

  return {
    id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: inferMediaType(file.type || ""),
    url: data.publicUrl,
    placement: "right",
    storagePath,
    fileName: file.name,
    mimeType: file.type || undefined,
    createdAt: new Date().toISOString(),
  };
}

export async function deleteAnalysisSectionMedia(media: AnalysisMedia): Promise<void> {
  if (!media.storagePath) return;
  const { error } = await supabase.storage
    .from(ANALYSIS_MEDIA_BUCKET)
    .remove([media.storagePath]);
  if (error) {
    throw new Error(error.message || "Failed to remove media.");
  }
}
