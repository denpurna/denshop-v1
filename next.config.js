
module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    distDir: 'build',
  }
  return nextConfig
}