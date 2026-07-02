import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AWS FortiGate HOL',
  description: 'Deploying FortiGate in AWS Hands-on Lab',

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    siteTitle: 'AWS FortiGate HOL',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Lab Guide', link: '/introduction' }
    ],

    sidebar: [
      {
        text: 'AWS FortiGate HOL',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Section 1: Lab Preparation', link: '/section-1-lab-preparation' },
          { text: 'Section 2: Deployment & Provisioning', link: '/section-2-deployment' },
          { text: 'Section 3: FortiGate Preparation', link: '/section-3-fortigate-preparation' },
          { text: 'Section 4: AWS SDN Connector', link: '/section-4-sdn-connector' },
          { text: 'Section 5: Traffic Inspection', link: '/section-5-traffic-inspection' },
          { text: 'Section 6: Resource Cleanup', link: '/section-6-resource-cleanup' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ozanoguz/fgt-aws-hol'
      }
    ],

    footer: {
      message: 'FortiGate AWS Hands-on Lab Guide',
      copyright: 'Copyright © 2026'
    }
  }
})
