import { SettingSectionType } from '../settings.type';

export const settingList: SettingSectionType[] = [
  {
    name: 'menus.organizationsSettings',
    permissions: [],
    children: [
      [
        {
          name: 'menus.organization',
          permissions: [],
          children: [
            { name: 'menus.profile', permissions: [], url: '/settings/profile' },
            { name: 'menus.fleetHubs', permissions: [], url: '/settings/fleet-hubs' },
            { name: 'menus.subscription', permissions: [], url: '/settings/subscriptions' },
          ],
        },
      ],
      [
        {
          name: 'menus.users&Roles',
          permissions: [],
          children: [
            { name: 'menus.users', permissions: [], url: '/settings/users' },
            { name: 'menus.roles', permissions: [], url: '/settings/roles' },
          ],
        },
      ],
      [
        {
          name: 'menus.setup&Configuration',
          permissions: [],
          children: [
            { name: 'menus.general', permissions: [], url: '/settings/general' },
            { name: 'menus.currencies', permissions: [], url: '/settings/currencies' },
            { name: 'menus.reminders', permissions: [], url: '/settings/reminders' },
          ],
        },
      ],
      [
        {
          name: 'menus.customization',
          permissions: [],
          children: [
            { name: 'menus.numberSeries', permissions: [], url: '/settings/number-series' },
            { name: 'menus.pdfTemplates', permissions: [], url: '/settings/pdf-templates' },
            {
              name: 'menus.emailNotifications',
              permissions: [],
              url: '/settings/email-notifications',
            },
          ],
        },
      ],
    ],
  },
  {
    name: 'menus.moduleSettings',
    permissions: [],
    children: [
      [
        {
          name: 'menus.job',
          permissions: [],
          children: [
            {
              name: 'Job Charge',
              permissions: [],

              children: [
                {
                  name: 'menus.chargeTemplate',
                  permissions: [],
                  url: '/settings/charge-templates',
                },
                {
                  name: 'menus.chargeComponent',
                  permissions: [],
                  url: '/settings/charge-components',
                },
                {
                  name: 'menus.chargeVariable',
                  permissions: [],
                  url: '/settings/charge-variables',
                },
              ],
            },
          ],
        },
      ],
      [
        {
          name: 'menus.dispatch',
          permissions: [],
          children: [{ name: 'menus.eventSettings', permissions: [], url: '/settings/events' }],
        },
      ],
      [
        {
          name: 'menus.person',
          permissions: [],
          children: [
            {
              name: 'menus.paySlip',
              permissions: [],
              children: [
                { name: 'menus.payType', permissions: [], url: '/settings/pay-types' },
                { name: 'menus.payComponent', permissions: [], url: '/settings/pay-components' },
                { name: 'menus.payVariable', permissions: [], url: '/settings/pay-variables' },
              ],
            },
            { name: 'menus.engagementType', permissions: [], url: '/settings/engagement-types' },
            { name: 'menus.division', permissions: [], url: '/settings/divisions' },
            { name: 'menus.jobTitle', permissions: [], url: '/settings/job-titles' },
          ],
        },
      ],
      [
        {
          name: 'menus.fleet',
          permissions: [],
          children: [
            { name: 'menus.vehicleType', permissions: [], url: '/settings/vehicle-types' },
            { name: 'menus.fuelType', permissions: [], url: '/settings/fuel-types' },
            { name: 'menus.licenseType', permissions: [], url: '/settings/license-types' },
          ],
        },
      ],
    ],
  },
];
