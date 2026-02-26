// ZoneBroz Premium Onboarding Wizard
// Shared vanilla JS controller for multi-step intake across contact page & modals

(function () {
  const totalSteps = 6;

  const onboardingConfig = {
    headlineOptions: [
      "Let\u2019s Build Something That Scales.",
      "Start Your Project With ZoneBroz.",
      "Tell Us About Your Vision.",
      "Your Growth Starts Here."
    ],
    defaultHeadlineIndex: 0,
    subtext:
      "Tell us about your project. We\u2019ll review it and respond with next steps.",
    primaryCtaLabel: "Start My Project",
    alternativeCtas: [
      "Book My Strategy Call",
      "Request Project Review",
      "Let's Build",
      "Start The Conversation"
    ],
    socialProofOptions: [
      "Trusted by founders, startups & scaling teams.",
      "We review every inquiry within 24 hours."
    ],
    socialProofIndex: 0
  };

  function safeGsap() {
    if (window.gsap) return window.gsap;
    return null;
  }

  function initOnboardingRoot(root) {
    const form = root.querySelector(".onboarding-form");
    if (!form) return;

    const context = root.getAttribute("data-context") || "default";
    const gsap = safeGsap();

    const headlineEl = root.querySelector(".onboarding-headline");
    const subtextEl = root.querySelector(".onboarding-subtext");
    const stepLabelEl = root.querySelector(".onboarding-step-label");
    const progressFillEl = root.querySelector(".onboarding-progress-bar-fill");
    const backButton = form.querySelector('[data-role="back"]');
    const nextButton = form.querySelector('[data-role="next"]');
    const submitButton = form.querySelector('[data-role="submit"]');
    const socialProofEl = form.querySelector(".onboarding-social-proof");

    const hiddenFields = {
      projectType: form.querySelector("#project_type_input"),
      projectStage: form.querySelector("#project_stage_input"),
      primaryGoal: form.querySelector("#primary_goal_input"),
      timeline: form.querySelector("#timeline_input"),
      investmentLevel: form.querySelector("#investment_level_input"),
      leadScore: form.querySelector("#lead_score_input"),
      leadFlags: form.querySelector("#lead_flags_input")
    };

    const contactNameInput = form.querySelector('input[name="name"]');
    const contactEmailInput = form.querySelector('input[name="_replyto"]');
    const contactCompanyInput = form.querySelector(
      'input[name="company_name"]'
    );
    const visionTextarea = form.querySelector(".onboarding-vision-textarea");

    const steps = Array.from(form.querySelectorAll(".onboarding-step"));

    const state = {
      currentStep: 1,
      projectType: null,
      projectStage: null,
      primaryGoal: null,
      timeline: null,
      investmentLevel: null,
      visionText: "",
      name: "",
      email: "",
      company: ""
    };

    function setInitialCopy() {
      if (headlineEl) {
        const index = onboardingConfig.defaultHeadlineIndex || 0;
        headlineEl.textContent =
          onboardingConfig.headlineOptions[index] ||
          onboardingConfig.headlineOptions[0];
      }
      if (subtextEl) {
        subtextEl.textContent = onboardingConfig.subtext;
      }
      if (submitButton) {
        submitButton.textContent = onboardingConfig.primaryCtaLabel;
      }
      if (socialProofEl) {
        const idx = onboardingConfig.socialProofIndex || 0;
        socialProofEl.textContent =
          onboardingConfig.socialProofOptions[idx] ||
          onboardingConfig.socialProofOptions[0];
      }
    }

    function updateHiddenFields() {
      if (hiddenFields.projectType)
        hiddenFields.projectType.value = state.projectType || "";
      if (hiddenFields.projectStage)
        hiddenFields.projectStage.value = state.projectStage || "";
      if (hiddenFields.primaryGoal)
        hiddenFields.primaryGoal.value = state.primaryGoal || "";
      if (hiddenFields.timeline)
        hiddenFields.timeline.value = state.timeline || "";
      if (hiddenFields.investmentLevel)
        hiddenFields.investmentLevel.value = state.investmentLevel || "";
    }

    function computeLeadScore() {
      let score = 0;
      const flags = [];

      switch (state.investmentLevel) {
        case "Under R15k":
          score += 1;
          break;
        case "R15k–R40k":
          score += 3;
          break;
        case "R40k–R100k":
          score += 6;
          break;
        case "R100k+":
          score += 8;
          break;
        default:
          break;
      }

      switch (state.projectStage) {
        case "Scaling existing product":
          score += 5;
          break;
        case "Rebuilding from scratch":
          score += 4;
          break;
        case "MVP built, need improvements":
          score += 3;
          break;
        case "Have designs ready":
          score += 2;
          break;
        case "Just an idea":
          score += 1;
          break;
        default:
          break;
      }

      if (
        state.primaryGoal === "Generate revenue" ||
        state.primaryGoal === "Integrate AI" ||
        state.primaryGoal === "Automate operations"
      ) {
        score += 2;
      }

      if (
        state.investmentLevel === "Under R15k" &&
        state.projectType &&
        state.projectType.indexOf("AI") !== -1
      ) {
        flags.push("low_fit_budget_ai");
      }

      if (
        (state.investmentLevel === "R40k–R100k" ||
          state.investmentLevel === "R100k+") &&
        state.projectStage === "Scaling existing product"
      ) {
        flags.push("high_priority_scaling");
      }

      if (!state.timeline || state.timeline === "ASAP (0–30 days)") {
        score += 1;
      }

      return { score, flags: flags.join(",") };
    }

    function applyLeadScore() {
      const { score, flags } = computeLeadScore();
      if (hiddenFields.leadScore) hiddenFields.leadScore.value = String(score);
      if (hiddenFields.leadFlags) hiddenFields.leadFlags.value = flags;
    }

    function showStep(step) {
      state.currentStep = step;
      steps.forEach((el) => {
        const stepIndex = Number(el.getAttribute("data-step"));
        const isActive = stepIndex === step;
        el.classList.toggle("onboarding-step-active", isActive);
        el.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      if (stepLabelEl) {
        stepLabelEl.textContent = "Step " + step + " of " + totalSteps;
      }

      if (progressFillEl) {
        const percentage = (step / totalSteps) * 100;
        if (gsap) {
          gsap.to(progressFillEl, {
            width: percentage + "%",
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          progressFillEl.style.width = percentage + "%";
        }
      }

      if (backButton) {
        backButton.disabled = step === 1;
      }
      if (nextButton) {
        nextButton.style.display = step < totalSteps ? "inline-flex" : "none";
      }
      if (submitButton) {
        submitButton.style.display =
          step === totalSteps ? "inline-flex" : "none";
      }

      updateNavButtonState();

      if (gsap) {
        const activeStep = steps.find((el) =>
          el.classList.contains("onboarding-step-active")
        );
        if (activeStep) {
          gsap.fromTo(
            activeStep,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
          );

          const children = activeStep.querySelectorAll(
            ".onboarding-step-heading, .onboarding-step-body, .onboarding-card, .onboarding-tile-group"
          );
          gsap.fromTo(
            children,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.04
            }
          );
        }
      }
    }

    function isStepComplete(step) {
      switch (step) {
        case 1:
          return !!state.projectType;
        case 2:
          return !!state.projectStage;
        case 3:
          return !!state.primaryGoal;
        case 4:
          return !!state.timeline && !!state.investmentLevel;
        case 5:
          return (state.visionText || "").trim().length >= 20;
        case 6:
          return (
            (state.name || "").trim().length > 0 &&
            (state.email || "").trim().length > 0
          );
        default:
          return true;
      }
    }

    function updateNavButtonState() {
      const complete = isStepComplete(state.currentStep);
      if (nextButton && state.currentStep < totalSteps) {
        nextButton.disabled = !complete;
      }
      if (submitButton && state.currentStep === totalSteps) {
        submitButton.disabled = !complete;
      }
    }

    function handleCardSelection(button) {
      const field = button.getAttribute("data-field");
      const value = button.getAttribute("data-value");
      if (!field || !value) return;

      const groupSelector =
        '.onboarding-card[data-field="' +
        field.replace(/"/g, '\\"') +
        '"]';
      const groupCards = root.querySelectorAll(groupSelector);
      groupCards.forEach((card) => {
        card.classList.remove("onboarding-card-selected");
        card.setAttribute("aria-pressed", "false");
      });

      button.classList.add("onboarding-card-selected");
      button.setAttribute("aria-pressed", "true");

      if (field === "projectType") state.projectType = value;
      if (field === "projectStage") state.projectStage = value;
      if (field === "primaryGoal") state.primaryGoal = value;
      if (field === "timeline") state.timeline = value;
      if (field === "investmentLevel") state.investmentLevel = value;

      updateHiddenFields();
      updateNavButtonState();

      if (gsap) {
        gsap.fromTo(
          button,
          { scale: 1.0 },
          { scale: 1.03, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
        );
      }
    }

    function initCards() {
      const cards = root.querySelectorAll(".onboarding-card");
      cards.forEach((card) => {
        card.addEventListener("click", function (e) {
          e.preventDefault();
          handleCardSelection(card);
        });
      });

      if (gsap) {
        cards.forEach((card) => {
          card.addEventListener("mouseenter", function () {
            gsap.to(card, {
              scale: 1.03,
              boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
              duration: 0.2,
              ease: "power2.out"
            });
          });
          card.addEventListener("mouseleave", function () {
            gsap.to(card, {
              scale: 1,
              boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
              duration: 0.25,
              ease: "power2.out"
            });
          });
        });
      }
    }

    function initInputs() {
      if (visionTextarea) {
        visionTextarea.addEventListener("input", function () {
          state.visionText = visionTextarea.value;
          updateNavButtonState();
        });
      }
      if (contactNameInput) {
        contactNameInput.addEventListener("input", function () {
          state.name = contactNameInput.value;
          updateNavButtonState();
        });
      }
      if (contactEmailInput) {
        contactEmailInput.addEventListener("input", function () {
          state.email = contactEmailInput.value;
          updateNavButtonState();
        });
      }
      if (contactCompanyInput) {
        contactCompanyInput.addEventListener("input", function () {
          state.company = contactCompanyInput.value;
        });
      }

      const focusables = form.querySelectorAll(
        "input, textarea, button, select"
      );
      if (gsap) {
        focusables.forEach((el) => {
          el.addEventListener("focus", function () {
            const wrapper = el.closest(".onboarding-field");
            if (!wrapper) return;
            wrapper.classList.add("onboarding-field-focused");
            gsap.fromTo(
              wrapper,
              { boxShadow: "0 0 0 0 rgba(255,255,255,0.0)" },
              {
                boxShadow: "0 0 0 1px rgba(255,255,255,0.18)",
                duration: 0.25,
                ease: "power2.out"
              }
            );
          });
          el.addEventListener("blur", function () {
            const wrapper = el.closest(".onboarding-field");
            if (!wrapper) return;
            wrapper.classList.remove("onboarding-field-focused");
            gsap.to(wrapper, {
              boxShadow: "0 0 0 0 rgba(255,255,255,0.0)",
              duration: 0.25,
              ease: "power2.out"
            });
          });
        });
      }
    }

    function initNavigation() {
      if (backButton) {
        backButton.addEventListener("click", function (e) {
          e.preventDefault();
          if (state.currentStep > 1) {
            showStep(state.currentStep - 1);
          }
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", function (e) {
          e.preventDefault();
          if (!isStepComplete(state.currentStep)) return;
          if (state.currentStep < totalSteps) {
            showStep(state.currentStep + 1);
          }
        });
      }

      if (submitButton) {
        if (gsap) {
          submitButton.addEventListener("mouseenter", function () {
            gsap.to(submitButton, {
              scale: 1.03,
              duration: 0.16,
              ease: "power2.out"
            });
          });
          submitButton.addEventListener("mouseleave", function () {
            gsap.to(submitButton, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          });
        }
      }
    }

    function initFormSubmit() {
      form.addEventListener("submit", function () {
        updateHiddenFields();
        applyLeadScore();
        if (submitButton && safeGsap()) {
          const gsapInst = safeGsap();
          const originalText = submitButton.textContent;
          submitButton.disabled = true;
          submitButton.classList.add("onboarding-cta-loading");
          submitButton.textContent = "Submitting...";
          gsapInst.to(submitButton, {
            scale: 0.98,
            duration: 0.15,
            ease: "power2.inOut"
          });
          setTimeout(function () {
            submitButton.textContent = originalText;
          }, 4000);
        }
      });
    }

    function animateIntro() {
      const gsapInstance = safeGsap();
      if (!gsapInstance) return;
      const container = root.querySelector(".onboarding-shell");
      if (!container) return;

      gsapInstance.fromTo(
        container,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      const headerItems = root.querySelectorAll(
        ".onboarding-headline, .onboarding-subtext"
      );
      gsapInstance.fromTo(
        headerItems,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }
      );
    }

    setInitialCopy();
    initCards();
    initInputs();
    initNavigation();
    initFormSubmit();
    showStep(1);
    animateIntro();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const roots = document.querySelectorAll(".onboarding-root");
    if (!roots.length) return;
    roots.forEach((root) => initOnboardingRoot(root));
  });
})();

