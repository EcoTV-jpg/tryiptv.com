export const socialLinks = {
  x: "https://x.com/tryiptv",
  instagram: "https://www.instagram.com/tryiptvofficial",
  // Owner-confirmed 2026-10-24: X, Instagram and Facebook below are the owner's accounts.
  facebook: "https://www.facebook.com/tryiptvofficial",
  whatsapp: "https://wa.me/212694833293",
} as const;

export const publicBrandSocialLinks = [
  socialLinks.x,
  socialLinks.instagram,
  socialLinks.facebook,
] as const;
