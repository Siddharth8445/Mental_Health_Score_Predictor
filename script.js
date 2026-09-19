(() => {
  "use strict";

  // =========================================================
  // API CONFIGURATION
  // =========================================================

  const API_BASE =
    "https://mental-health-score-predictor-1-3uih.onrender.com";


  // =========================================================
  // DOM ELEMENTS
  // =========================================================

  const form = document.getElementById("predict-form");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const errorRetryBtn = document.getElementById("error-retry-btn");

  const stateIdle = document.getElementById("state-idle");
  const stateLoading = document.getElementById("state-loading");
  const stateResult = document.getElementById("state-result");
  const stateError = document.getElementById("state-error");

  const scoreNumberEl = document.getElementById("score-number");
  const scoreBandEl = document.getElementById("score-band");
  const scoreContextEl = document.getElementById("score-context");
  const gaugeFill = document.getElementById("gauge-fill");

  const errorCopyEl = document.getElementById("error-copy");


  // =========================================================
  // GAUGE CONFIGURATION
  // =========================================================

  const GAUGE_ARC_LENGTH = 314;


  // =========================================================
  // DRAW GAUGE TICKS
  // =========================================================

  function drawTicks() {
    document.querySelectorAll(".gauge-ticks").forEach((g) => {
      g.innerHTML = "";

      const cx = 120;
      const cy = 140;
      const rOuter = 100;
      const rInner = 90;

      for (let i = 0; i <= 10; i += 2) {

        const angle =
          Math.PI - (i / 10) * Math.PI;

        const x1 =
          cx + rOuter * Math.cos(angle);

        const y1 =
          cy - rOuter * Math.sin(angle);

        const x2 =
          cx + rInner * Math.cos(angle);

        const y2 =
          cy - rInner * Math.sin(angle);

        const line =
          document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );

        line.setAttribute("x1", x1.toFixed(1));
        line.setAttribute("y1", y1.toFixed(1));
        line.setAttribute("x2", x2.toFixed(1));
        line.setAttribute("y2", y2.toFixed(1));

        g.appendChild(line);
      }
    });
  }

  drawTicks();


  // =========================================================
  // STRESS LEVEL SEGMENTED CONTROL
  // =========================================================

  const segGroup =
    document.getElementById("stress_level_group");

  const stressHiddenInput =
    document.getElementById("stress_level");

  if (segGroup && stressHiddenInput) {

    segGroup
      .querySelectorAll(".seg-btn")
      .forEach((btn) => {

        btn.addEventListener("click", () => {

          // Remove active state
          segGroup
            .querySelectorAll(".seg-btn")
            .forEach((b) =>
              b.classList.remove("active")
            );

          // Activate selected button
          btn.classList.add("active");

          // IMPORTANT:
          // Backend expects "Very High", not "VeryHigh"
          stressHiddenInput.value =
            btn.dataset.value;

          clearFieldError(stressHiddenInput);
        });

      });
  }


  // =========================================================
  // FIELD ERROR HELPERS
  // =========================================================

  function fieldWrapper(input) {

    if (!input) {
      return null;
    }

    return input.closest(".field");
  }


  function setFieldError(input, message) {

    const wrap = fieldWrapper(input);

    if (!wrap) {
      return;
    }

    wrap.classList.add("field-error");

    const msgEl =
      wrap.querySelector(".error-msg");

    if (msgEl) {
      msgEl.textContent = message;
    }
  }


  function clearFieldError(input) {

    const wrap = fieldWrapper(input);

    if (!wrap) {
      return;
    }

    wrap.classList.remove("field-error");

    const msgEl =
      wrap.querySelector(".error-msg");

    if (msgEl) {
      msgEl.textContent = "";
    }
  }


  function clearAllErrors() {

    form
      .querySelectorAll(".field")
      .forEach((field) =>
        field.classList.remove("field-error")
      );

    form
      .querySelectorAll(".error-msg")
      .forEach((msg) =>
        (msg.textContent = "")
      );
  }


  // =========================================================
  // COLLECT FORM DATA
  // =========================================================
  //
  // IMPORTANT:
  // FastAPI expects these EXACT field names:
  //
  // Age
  // Gender
  // Country
  // Academic_Level
  // Most_Used_Platform
  // Purpose_Of_Use
  // Avg_Daily_Usage_Hours
  // Daily_Unlocks
  // Study_Hours
  // Physical_Activity_Hours
  // Sleep_Hours_Per_Night
  // Stress_Level
  //
  // =========================================================

  function collectPayload() {

    const fd = new FormData(form);

    return {

      Age:
        fd.get("age") === ""
          ? NaN
          : parseInt(
              fd.get("age"),
              10
            ),

      Gender:
        fd.get("gender") || "",

      Country:
        (fd.get("country") || "").trim(),

      Academic_Level:
        fd.get("academic_level") || "",

      Most_Used_Platform:
        fd.get("most_used_platform") || "",

      Purpose_Of_Use:
        fd.get("purpose_of_use") || "",

      Avg_Daily_Usage_Hours:
        fd.get("avg_daily_usage_hours") === ""
          ? NaN
          : parseFloat(
              fd.get("avg_daily_usage_hours")
            ),

      Daily_Unlocks:
        fd.get("daily_unlocks") === ""
          ? NaN
          : parseInt(
              fd.get("daily_unlocks"),
              10
            ),

      Study_Hours:
        fd.get("study_hours") === ""
          ? NaN
          : parseFloat(
              fd.get("study_hours")
            ),

      Physical_Activity_Hours:
        fd.get("physical_activity_hours") === ""
          ? NaN
          : parseFloat(
              fd.get("physical_activity_hours")
            ),

      Sleep_Hours_Per_Night:
        fd.get("sleep_hours_per_night") === ""
          ? NaN
          : parseFloat(
              fd.get("sleep_hours_per_night")
            ),

      Stress_Level:
        fd.get("stress_level") || ""
    };
  }


  // =========================================================
  // CLIENT-SIDE VALIDATION
  // =========================================================

  function validate(payload) {

    const errors = [];


    // -------------------------
    // Numeric fields
    // -------------------------

    const numericChecks = [

      [
        "Age",
        "age",
        10,
        100
      ],

      [
        "Avg_Daily_Usage_Hours",
        "avg_daily_usage_hours",
        0,
        24
      ],

      [
        "Daily_Unlocks",
        "daily_unlocks",
        0,
        Infinity
      ],

      [
        "Study_Hours",
        "study_hours",
        0,
        24
      ],

      [
        "Physical_Activity_Hours",
        "physical_activity_hours",
        0,
        24
      ],

      [
        "Sleep_Hours_Per_Night",
        "sleep_hours_per_night",
        0,
        24
      ]

    ];


    numericChecks.forEach(
      ([key, elementId, min, max]) => {

        const input =
          document.getElementById(elementId);

        const value =
          payload[key];


        if (
          value === "" ||
          value === null ||
          Number.isNaN(value)
        ) {

          errors.push([
            input,
            "This field is required."
          ]);

        }

        else if (
          value < min ||
          value > max
        ) {

          errors.push([
            input,
            `Must be between ${min} and ${
              max === Infinity
                ? "0+"
                : max
            }.`
          ]);

        }

      }
    );


    // -------------------------
    // Required text/select fields
    // -------------------------

    const requiredFields = [

      [
        "Gender",
        "gender"
      ],

      [
        "Country",
        "country"
      ],

      [
        "Academic_Level",
        "academic_level"
      ],

      [
        "Most_Used_Platform",
        "most_used_platform"
      ],

      [
        "Purpose_Of_Use",
        "purpose_of_use"
      ]

    ];


    requiredFields.forEach(
      ([key, elementId]) => {

        const input =
          document.getElementById(elementId);

        if (
          !payload[key] ||
          String(payload[key]).trim() === ""
        ) {

          errors.push([
            input,
            "This field is required."
          ]);

        }

      }
    );


    // -------------------------
    // Stress level
    // -------------------------

    if (!payload.Stress_Level) {

      errors.push([
        stressHiddenInput,
        "Pick a stress level."
      ]);

    }


    return errors;
  }


  // =========================================================
  // UI STATE MANAGEMENT
  // =========================================================

  function showState(name) {

    [
      stateIdle,
      stateLoading,
      stateResult,
      stateError

    ].forEach((element) => {

      if (element) {
        element.hidden = true;
      }

    });


    const states = {

      idle: stateIdle,

      loading: stateLoading,

      result: stateResult,

      error: stateError

    };


    if (states[name]) {
      states[name].hidden = false;
    }
  }


  // =========================================================
  // SUBMIT BUTTON
  // =========================================================

  function setSubmitting(isSubmitting) {

    submitBtn.disabled =
      isSubmitting;

    submitBtn.classList.toggle(
      "loading",
      isSubmitting
    );
  }


  // =========================================================
  // SCORE BAND
  // =========================================================

  function bandFor(score) {

    if (score < 4) {

      return {

        label: "Signal: strained",

        context:
          "Your responses suggest elevated strain right now. Small shifts in sleep or screen time can go a long way."

      };
    }


    if (score < 7) {

      return {

        label: "Signal: balanced",

        context:
          "Your rhythm looks fairly steady, with some room to recover and reset."

      };
    }


    return {

      label: "Signal: strong",

      context:
        "Your habits point to a well-supported, resilient baseline. Keep it up."

    };
  }


  // =========================================================
  // DISPLAY RESULT
  // =========================================================

  function renderResult(score) {

    // Keep gauge between 0 and 10
    const clamped =
      Math.max(
        0,
        Math.min(10, score)
      );


    const {
      label,
      context
    } = bandFor(clamped);


    scoreNumberEl.textContent =
      Number(score).toFixed(2);


    scoreBandEl.textContent =
      label;


    scoreContextEl.textContent =
      context;


    // Reset gauge animation
    gaugeFill.style.transition =
      "none";

    gaugeFill.style.strokeDashoffset =
      String(GAUGE_ARC_LENGTH);


    requestAnimationFrame(() => {

      gaugeFill.style.transition =
        "";

      const offset =
        GAUGE_ARC_LENGTH *
        (1 - clamped / 10);

      gaugeFill.style.strokeDashoffset =
        String(offset);

    });


    showState("result");
  }


  // =========================================================
  // DISPLAY ERROR
  // =========================================================

  function renderError(label, copy) {

    if (!errorCopyEl) {
      return;
    }


    errorCopyEl.textContent =
      `${label}: ${copy}`;


    showState("error");
  }


  // =========================================================
  // HANDLE FASTAPI VALIDATION ERRORS
  // =========================================================

  function applyServerValidationErrors(detail) {

    if (!Array.isArray(detail)) {
      return false;
    }


    let matched = false;


    detail.forEach((err) => {

      const field =
        Array.isArray(err.loc)
          ? err.loc[err.loc.length - 1]
          : null;


      // Map FastAPI field names to HTML IDs
      const fieldMap = {

        Age: "age",

        Gender: "gender",

        Country: "country",

        Academic_Level:
          "academic_level",

        Most_Used_Platform:
          "most_used_platform",

        Purpose_Of_Use:
          "purpose_of_use",

        Avg_Daily_Usage_Hours:
          "avg_daily_usage_hours",

        Daily_Unlocks:
          "daily_unlocks",

        Study_Hours:
          "study_hours",

        Physical_Activity_Hours:
          "physical_activity_hours",

        Sleep_Hours_Per_Night:
          "sleep_hours_per_night",

        Stress_Level:
          "stress_level"

      };


      const elementId =
        fieldMap[field];


      const input =
        elementId
          ? document.getElementById(elementId)
          : null;


      if (input) {

        setFieldError(
          input,
          err.msg || "Invalid value."
        );

        matched = true;
      }

    });


    return matched;
  }


  // =========================================================
  // FORM SUBMISSION
  // =========================================================

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();


      clearAllErrors();


      const payload =
        collectPayload();


      // -------------------------
      // Client validation
      // -------------------------

      const clientErrors =
        validate(payload);


      if (clientErrors.length > 0) {

        clientErrors.forEach(
          ([input, message]) => {

            if (input) {

              setFieldError(
                input,
                message
              );

            }

          }
        );


        if (clientErrors[0][0]) {

          clientErrors[0][0].focus();

        }


        return;
      }


      // -------------------------
      // Loading state
      // -------------------------

      setSubmitting(true);

      showState("loading");


      try {

        // -------------------------
        // Send prediction request
        // -------------------------

        const response =
          await fetch(
            `${API_BASE}/predict`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(payload)
            }
          );


        // -------------------------
        // FastAPI 422 validation
        // -------------------------

        if (response.status === 422) {

          const body =
            await response
              .json()
              .catch(() => null);


          const matched =
            body &&
            applyServerValidationErrors(
              body.detail
            );


          renderError(
            "Check your inputs",

            matched
              ? "The API rejected a few fields. Details are marked on the form."
              : "The API rejected this submission. Please review your inputs and try again."
          );


          return;
        }


        // -------------------------
        // Other API errors
        // -------------------------

        if (!response.ok) {

          let detailMsg =
            `The API responded with status ${response.status}.`;


          const body =
            await response
              .json()
              .catch(() => null);


          if (
            body &&
            typeof body.detail === "string"
          ) {

            detailMsg =
              body.detail;

          }


          renderError(
            "Prediction failed",
            detailMsg
          );


          return;
        }


        // -------------------------
        // Successful response
        // -------------------------

        const data =
          await response.json();


        // IMPORTANT:
        // This matches your FastAPI response:
        //
        // predicted_mental_health_status
        //

        if (
          typeof data.predicted_mental_health_status
          !== "number"
        ) {

          renderError(
            "Unexpected response",
            "The API responded, but the predicted score was missing or malformed."
          );


          return;
        }


        // Display result
        renderResult(
          data.predicted_mental_health_status
        );

      }


      // =====================================================
      // NETWORK / CONNECTION ERROR
      // =====================================================

      catch (error) {

        console.error(
          "Prediction request failed:",
          error
        );


        renderError(
          "Can't reach the server",

          `Couldn't connect to the prediction API. Please check your internet connection and try again.`
        );

      }


      // =====================================================
      // FINISH SUBMISSION
      // =====================================================

      finally {

        setSubmitting(false);

      }

    }
  );


  // =========================================================
  // LIVE ERROR CLEARING
  // =========================================================

  form
    .querySelectorAll(
      "input, select"
    )
    .forEach((element) => {

      element.addEventListener(
        "input",
        () =>
          clearFieldError(element)
      );


      element.addEventListener(
        "change",
        () =>
          clearFieldError(element)
      );

    });


  // =========================================================
  // RESET RESULT
  // =========================================================

  if (resetBtn) {

    resetBtn.addEventListener(
      "click",
      () => {

        showState("idle");

      }
    );

  }


  // =========================================================
  // RETRY AFTER ERROR
  // =========================================================

  if (errorRetryBtn) {

    errorRetryBtn.addEventListener(
      "click",
      () => {

        showState("idle");

      }
    );

  }

})();