import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: "propia", // organización de Sentry
  project: "javascript-nextjs", // proyecto de Sentry
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
