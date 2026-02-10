import { Report } from "../types";
import { useUser } from "../context/UserContext";
import { generateSlides } from "../utils/slides";
import SlideContainer from "./SlideContainer";

interface ReportViewerProps {
  report: Report;
}

export default function ReportViewer({ report }: ReportViewerProps) {
  const { currentUser } = useUser();
  const slides = generateSlides(report, currentUser.tier);

  return <SlideContainer slides={slides} />;
}
