"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  Check,
  ChevronDown,
  Landmark,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";

import { RiWhatsappFill } from "@remixicon/react";

import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

import emailjs from "@emailjs/browser";

/* =========================================================
   SUBJECT OPTIONS
========================================================= */

const SUBJECT_OPTIONS = [
  "Admissions Enquiry",
  "Donation & Zakat",
  "Volunteering & Support",
  "General Enquiry",
  "Other",
];

/* =========================================================
   VALIDATION
========================================================= */

const NAME_PATTERN = /^[\p{L}\s-]+$/u;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_CHAR_PATTERN = /^[0-9+\-\s]+$/;

const LIMITS = {
  fullName: {
    min: 2,
    max: 50,
  },

  email: {
    max: 254,
  },

  phone: {
    max: 20,
  },

  message: {
    min: 10,
    max: 1000,
  },
} as const;

const PHONE_DIGITS = {
  min: 7,
  max: 15,
} as const;

/* =========================================================
   TYPES
========================================================= */

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<
  Record<keyof FormValues, string>
>;

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

/* =========================================================
   INITIAL FORM VALUES
========================================================= */

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

/* =========================================================
   HELPERS
========================================================= */

function stripControlChars(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim();
}

function validate(
  values: FormValues
): FormErrors {
  const errors: FormErrors = {};

  /* -------------------------
     Full Name
  ------------------------- */

  const fullName =
    values.fullName.trim();

  if (!fullName) {
    errors.fullName =
      "Please enter your full name.";
  } else if (
    fullName.length <
      LIMITS.fullName.min ||
    fullName.length >
      LIMITS.fullName.max
  ) {
    errors.fullName =
      `Full name must be ${LIMITS.fullName.min}–${LIMITS.fullName.max} characters.`;
  } else if (
    !NAME_PATTERN.test(fullName)
  ) {
    errors.fullName =
      "Full name can only contain letters, spaces, and hyphens.";
  }

  /* -------------------------
     Email
  ------------------------- */

  const email =
    values.email.trim();

  if (!email) {
    errors.email =
      "Please enter your email address.";
  } else if (
    email.length >
    LIMITS.email.max
  ) {
    errors.email =
      "Please enter a shorter email address.";
  } else if (
    !EMAIL_PATTERN.test(email)
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  /* -------------------------
     Phone
  ------------------------- */

  const phone =
    values.phone.trim();

  const phoneDigitCount =
    phone.replace(/\D/g, "").length;

  if (!phone) {
    errors.phone =
      "Please enter your phone number.";
  } else if (
    !PHONE_CHAR_PATTERN.test(phone)
  ) {
    errors.phone =
      "Phone number can only contain digits, spaces, hyphens, and a leading +.";
  } else if (
    phoneDigitCount <
      PHONE_DIGITS.min ||
    phoneDigitCount >
      PHONE_DIGITS.max
  ) {
    errors.phone =
      `Phone number must have ${PHONE_DIGITS.min}–${PHONE_DIGITS.max} digits.`;
  }

  /* -------------------------
     Subject
  ------------------------- */

  if (!values.subject) {
    errors.subject =
      "Please select a subject.";
  }

  /* -------------------------
     Message
  ------------------------- */

  const message =
    values.message.trim();

  if (!message) {
    errors.message =
      "Please enter a message.";
  } else if (
    message.length <
    LIMITS.message.min
  ) {
    errors.message =
      `Please enter at least ${LIMITS.message.min} characters.`;
  } else if (
    message.length >
    LIMITS.message.max
  ) {
    errors.message =
      `Message must be ${LIMITS.message.max} characters or fewer.`;
  }

  return errors;
}

/* =========================================================
   CONTACT COMPONENT
========================================================= */

export function Contact() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useScrollReveal(containerRef);

  const [values, setValues] =
    useState<FormValues>(
      INITIAL_VALUES
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [status, setStatus] =
    useState<SubmitStatus>("idle");

  const [honeypot, setHoneypot] =
    useState("");

  /* =======================================================
     SUBJECT DROPDOWN (custom-styled listbox)

     A native <select> can't be restyled to match the theme —
     its open panel is rendered by the OS/browser, not CSS.
     This is a lightweight combobox instead: a themed trigger
     button plus a themed option panel, closing on outside
     click, Escape, or selection.
  ======================================================= */

  const [subjectOpen, setSubjectOpen] =
    useState(false);

  const subjectRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!subjectOpen) return;

    const handlePointerDown = (
      event: MouseEvent
    ) => {
      if (
        subjectRef.current &&
        !subjectRef.current.contains(
          event.target as Node
        )
      ) {
        setSubjectOpen(false);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSubjectOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handlePointerDown
    );
    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [subjectOpen]);

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  const updateField = <
    K extends keyof FormValues,
  >(
    key: K,
    value: FormValues[K]
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    /*
      Clear the field error
      when the user starts editing it.
    */

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }

    /*
      Remove old success/error
      message when editing.
    */

    if (
      status === "success" ||
      status === "error"
    ) {
      setStatus("idle");
    }
  };

  /* =======================================================
     HANDLE SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /*
      Prevent double submission
    */

    if (status === "submitting") {
      return;
    }

    /* =====================================================
       HONEYPOT SPAM PROTECTION
    ===================================================== */

    if (honeypot.trim()) {
      /*
        Bots often fill hidden fields.

        We pretend the request succeeded
        but do not send anything.
      */

      if (
        process.env.NODE_ENV ===
        "development"
      ) {
        console.warn(
          "Contact form honeypot triggered."
        );
      }

      setStatus("success");

      setValues(INITIAL_VALUES);

      setErrors({});

      setHoneypot("");

      return;
    }

    /* =====================================================
       VALIDATE FORM
    ===================================================== */

    const validationErrors =
      validate(values);

    setErrors(validationErrors);

    if (
      Object.keys(
        validationErrors
      ).length > 0
    ) {
      return;
    }

    /* =====================================================
       EMAILJS ENVIRONMENT VARIABLES

       IMPORTANT:
       Define variables BEFORE using/logging them.
    ===================================================== */

    const serviceId =
      process.env
        .NEXT_PUBLIC_EMAILJS_SERVICE_ID;

    const notifyTemplateId =
      process.env
        .NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID;

    const autoReplyTemplateId =
      process.env
        .NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;

    const publicKey =
      process.env
        .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    /* =====================================================
       CHECK EMAILJS CONFIGURATION
    ===================================================== */

    if (
      !serviceId ||
      !notifyTemplateId ||
      !autoReplyTemplateId ||
      !publicKey
    ) {
      console.error(
        "EmailJS configuration is missing.",
        {
          serviceIdExists:
            Boolean(serviceId),

          notifyTemplateIdExists:
            Boolean(
              notifyTemplateId
            ),

          autoReplyTemplateIdExists:
            Boolean(
              autoReplyTemplateId
            ),

          publicKeyExists:
            Boolean(publicKey),
        }
      );

      setStatus("error");

      return;
    }

    /* =====================================================
       PREPARE FORM DATA
    ===================================================== */

    const name =
      stripControlChars(
        values.fullName
      );

    const email =
      values.email
        .trim()
        .toLowerCase();

    const phone =
      stripControlChars(
        values.phone
      );

    const subject =
      stripControlChars(
        values.subject
      );

    const message =
      values.message.trim();

    const submittedAt =
      new Date().toLocaleString(
        "en-PK",
        {
          timeZone:
            "Asia/Karachi",

          dateStyle:
            "medium",

          timeStyle:
            "short",
        }
      );

    /* =====================================================
       START SENDING
    ===================================================== */

    setStatus("submitting");

    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Sending EmailJS contact notification...",
        {
          serviceId,
          notifyTemplateId,
          name,
          email,
          phone,
          subject,
          submittedAt,
        }
      );
    }

    try {
      /* ===================================================
         EMAIL 1:
         NOTIFICATION TO MADRASA / HOSTINGER INBOX
      =================================================== */

      const notificationResponse =
        await emailjs.send(
          serviceId,
          notifyTemplateId,
          {
            from_name: name,

            from_email: email,

            phone,

            subject,

            message,

            submitted_at:
              submittedAt,
          },
          {
            publicKey,
          }
        );

      console.log(
        "EmailJS notification sent successfully:",
        {
          status:
            notificationResponse.status,

          text:
            notificationResponse.text,
        }
      );

      /* ===================================================
         EMAIL 2:
         AUTO-REPLY TO VISITOR

         Best-effort only.
         Notification has already been received,
         so auto-reply failure should not show the
         visitor a submission error.
      =================================================== */

      try {
        const autoReplyResponse =
          await emailjs.send(
            serviceId,
            autoReplyTemplateId,
            {
              to_name: name,

              to_email: email,

              subject,
            },
            {
              publicKey,
            }
          );

        console.log(
          "EmailJS auto-reply sent successfully:",
          {
            status:
              autoReplyResponse.status,

            text:
              autoReplyResponse.text,
          }
        );
      } catch (
        autoReplyError
      ) {
        console.error(
          "EmailJS auto-reply failed:",
          autoReplyError
        );
      }

      /* ===================================================
         SUCCESS
      =================================================== */

      setStatus("success");

      setValues(
        INITIAL_VALUES
      );

      setErrors({});

      setHoneypot("");
    } catch (error) {
      /* ===================================================
         MAIN NOTIFICATION FAILED
      =================================================== */

      console.error(
        "EmailJS notification failed:",
        error
      );

      setStatus("error");
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section
      id="contact"
      ref={containerRef}
      className="bg-bg py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ===============================================
              LEFT SIDE
          =============================================== */}

          <div className="flex flex-col gap-8">

            <SectionHeading
              eyebrow="Get in Touch"
              eyebrowIcon={
                Landmark
              }
              heading="Visit us, or reach out directly."
              description="We'd love to hear from you. You can visit us at our campus or message us directly using the form."
            />

            {/* CONTACT DETAILS */}

            <div
              data-reveal
              className="flex flex-col divide-y divide-black/5"
            >

              {/* ADDRESS */}

              <div className="flex items-start gap-4 py-4 first:pt-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                  <MapPin
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <h3 className="font-heading text-sm font-semibold text-brand-blue">
                    Address
                  </h3>

                  {CONTACT_INFO.addressLines.map(
                    (line) => (
                      <p
                        key={line}
                        className="text-sm text-ink-soft"
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>

              {/* PHONE */}

              <div className="flex items-start gap-4 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Phone
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <h3 className="font-heading text-sm font-semibold text-brand-blue">
                    Phone
                  </h3>

                  <a
                    href={
                      CONTACT_INFO.phoneHref
                    }
                    className="text-sm text-ink-soft hover:text-brand-blue"
                  >
                    {
                      CONTACT_INFO.phoneDisplay
                    }
                  </a>
                </div>
              </div>

              {/* EMAIL */}

              <div className="flex items-start gap-4 py-4 last:pb-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Mail
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <h3 className="font-heading text-sm font-semibold text-brand-blue">
                    Email
                  </h3>

                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-ink-soft hover:text-brand-blue"
                  >
                    {
                      CONTACT_INFO.email
                    }
                  </a>
                </div>
              </div>
            </div>

            {/* WHATSAPP */}

            <div
              data-reveal
              className="flex flex-col gap-3"
            >
              <a
                href={
                  SOCIAL_LINKS.whatsapp
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-6 text-sm font-semibold text-white shadow-sm transition-all duration-250 hover:scale-[1.02] hover:bg-brand-green-dark"
              >
                <RiWhatsappFill
                  className="h-5 w-5"
                  aria-hidden="true"
                />

                Message on WhatsApp
              </a>

              <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
                <ShieldCheck
                  className="h-4 w-4 text-brand-blue"
                  aria-hidden="true"
                />

                We typically reply
                within a few hours.
              </p>
            </div>
          </div>

          {/* ===============================================
              RIGHT SIDE - CONTACT FORM
          =============================================== */}

          <div
            data-reveal
            className="rounded-3xl bg-brand-blue p-6 text-white sm:p-8"
          >

            {/* FORM HEADING */}

            <div className="mb-6 flex flex-col items-center gap-3 text-center">

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                <Mail
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </span>

              <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                Send us a Message
              </h3>

              <span
                className="h-1.5 w-1.5 rotate-45 bg-white/60"
                aria-hidden="true"
              />
            </div>

            {/* =============================================
                FORM
            ============================================= */}

            <form
              onSubmit={
                handleSubmit
              }
              noValidate
              className="flex flex-col gap-4"
            >

              {/* HONEYPOT */}

              <div
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="company">
                  Company
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) =>
                    setHoneypot(
                      e.target.value
                    )
                  }
                />
              </div>

              {/* NAME + EMAIL */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <Field
                  id="fullName"
                  label="Full Name"
                  icon={User}
                  error={
                    errors.fullName
                  }
                >
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Full Name"
                    value={
                      values.fullName
                    }
                    onChange={(e) =>
                      updateField(
                        "fullName",
                        e.target.value
                      )
                    }
                    aria-invalid={
                      Boolean(
                        errors.fullName
                      )
                    }
                    minLength={
                      LIMITS.fullName.min
                    }
                    maxLength={
                      LIMITS.fullName.max
                    }
                    className={
                      inputClasses
                    }
                  />
                </Field>

                <Field
                  id="email"
                  label="Email Address"
                  icon={Mail}
                  error={
                    errors.email
                  }
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    value={
                      values.email
                    }
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                    aria-invalid={
                      Boolean(
                        errors.email
                      )
                    }
                    maxLength={
                      LIMITS.email.max
                    }
                    className={
                      inputClasses
                    }
                  />
                </Field>
              </div>

              {/* PHONE */}

              <Field
                id="phone"
                label="Phone Number"
                icon={
                  PhoneCall
                }
                error={
                  errors.phone
                }
              >
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  value={
                    values.phone
                  }
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value
                    )
                  }
                  aria-invalid={
                    Boolean(
                      errors.phone
                    )
                  }
                  maxLength={
                    LIMITS.phone.max
                  }
                  className={
                    inputClasses
                  }
                />
              </Field>

              {/* SUBJECT */}

              <div ref={subjectRef}>
                <label
                  htmlFor="subject"
                  className="sr-only"
                >
                  Subject
                </label>

                <div className="relative flex items-center">
                  <MessageSquare
                    className="pointer-events-none absolute left-4 z-10 h-5 w-5 text-ink-soft/60"
                    aria-hidden="true"
                  />

                  <button
                    id="subject"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={
                      subjectOpen
                    }
                    aria-describedby={
                      errors.subject
                        ? "subject-error"
                        : undefined
                    }
                    onClick={() =>
                      setSubjectOpen(
                        (open) => !open
                      )
                    }
                    className={cn(
                      inputClasses,
                      "flex items-center text-left",
                      !values.subject &&
                        "text-ink-soft/60"
                    )}
                  >
                    {values.subject ||
                      "Subject"}
                  </button>

                  <ChevronDown
                    className={cn(
                      "pointer-events-none absolute right-4 h-4 w-4 text-ink-soft/60 transition-transform duration-200",
                      subjectOpen &&
                        "rotate-180"
                    )}
                    aria-hidden="true"
                  />

                  {subjectOpen && (
                    <ul
                      role="listbox"
                      aria-label="Subject"
                      className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl bg-white p-1.5 text-ink shadow-xl shadow-black/15 ring-1 ring-black/5"
                    >
                      {SUBJECT_OPTIONS.map(
                        (option) => {
                          const selected =
                            values.subject ===
                            option;

                          return (
                            <li
                              key={option}
                              role="presentation"
                            >
                              <button
                                type="button"
                                role="option"
                                aria-selected={
                                  selected
                                }
                                onClick={() => {
                                  updateField(
                                    "subject",
                                    option
                                  );
                                  setSubjectOpen(
                                    false
                                  );
                                }}
                                className={cn(
                                  "flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors duration-150",
                                  selected
                                    ? "bg-brand-blue/10 font-semibold text-brand-blue"
                                    : "text-ink hover:bg-bg-alt"
                                )}
                              >
                                {option}
                                {selected && (
                                  <Check
                                    className="h-4 w-4 shrink-0 text-brand-blue"
                                    aria-hidden="true"
                                  />
                                )}
                              </button>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                </div>

                {errors.subject && (
                  <p
                    id="subject-error"
                    className="mt-1 text-sm text-amber-200"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* MESSAGE */}

              <div>
                <label
                  htmlFor="message"
                  className="sr-only"
                >
                  Your Message
                </label>

                <div className="relative">

                  <MessageSquare
                    className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-ink-soft/60"
                    aria-hidden="true"
                  />

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    value={
                      values.message
                    }
                    onChange={(e) =>
                      updateField(
                        "message",
                        e.target.value
                      )
                    }
                    aria-invalid={
                      Boolean(
                        errors.message
                      )
                    }
                    minLength={
                      LIMITS.message.min
                    }
                    maxLength={
                      LIMITS.message.max
                    }
                    className={cn(
                      inputClasses,
                      "resize-y pt-4"
                    )}
                  />
                </div>

                {errors.message && (
                  <p className="mt-1 text-sm text-amber-200">
                    {
                      errors.message
                    }
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={
                  status ===
                  "submitting"
                }
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-sky to-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-250 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status ===
                "submitting"
                  ? "Sending…"
                  : "Send Enquiry"}

                <Send
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </button>

              {/* SUCCESS MESSAGE */}

              {status ===
                "success" && (
                <p className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm text-white">
                  Thank you — your
                  message has been
                  sent. We&apos;ll be
                  in touch soon, in
                  shaa Allah.
                </p>
              )}

              {/* ERROR MESSAGE */}

              {status ===
                "error" && (
                <p className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm text-amber-200">
                  Something went wrong
                  sending your message.
                  Please try again, or
                  reach us directly via
                  phone, email, or
                  WhatsApp.
                </p>
              )}

              {/* PRIVACY */}

              <p className="mt-1 inline-flex items-center justify-center gap-2 text-xs text-white/75">
                <Lock
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />

                Your information is
                safe with us and will
                never be shared.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INPUT STYLES
========================================================= */

const inputClasses =
  "min-h-11 w-full rounded-xl border border-transparent bg-white pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none ring-0 focus-visible:border-brand-sky";

/* =========================================================
   FIELD COMPONENT
========================================================= */

function Field({
  id,
  label,
  icon: Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: typeof User;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="sr-only"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <Icon
          className="pointer-events-none absolute left-4 h-5 w-5 text-ink-soft/60"
          aria-hidden="true"
        />

        {children}
      </div>

      {error && (
        <p className="mt-1 text-sm text-amber-200">
          {error}
        </p>
      )}
    </div>
  );
}