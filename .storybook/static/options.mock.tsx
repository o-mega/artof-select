import React from 'react';
import { SelectOption } from "../../src";
import * as flags from './';

const industryOptions: SelectOption[] = [
  {
    label: 'Accounting',
    value: 'accounting'
  },
  {
    label: 'Administration & Office Support',
    value: 'administration'
  },
  {
    label: 'Advertising, Arts & Media',
    value: 'advertising'
  },
  {
    label: 'Banking & Financial Services',
    value: 'banking'
  },
  {
    label: 'Call Centre & Customer Service',
    value: 'call'
  },
  {
    label: 'Community Services & Development',
    value: 'community'
  },
  {
    label: 'Construction',
    value: 'construction'
  },
  {
    label: 'Consulting & Strategy',
    value: 'consulting'
  },
  {
    label: 'Design & Architechture',
    value: 'design'
  },
  {
    label: 'Education & Training',
    value: 'education'
  },
  {
    label: 'Engineering',
    value: 'engineering'
  },
  {
    label: 'Farming, Animals & Conservation',
    value: 'farming'
  },
  {
    label: 'Government & Defence',
    value: 'government'
  },
  {
    label: 'Healthcare & Medical',
    value: 'healthcare'
  },
  {
    label: 'Hospitality & Tourism',
    value: 'hospitality'
  },
  {
    label: 'Human Resources & Recruitment',
    value: 'human'
  },
  {
    label: 'Information & Communication Technology',
    value: 'information'
  },
  {
    label: 'Insurance & Superannuation',
    value: 'insurance'
  },
  {
    label: 'Legal',
    value: 'legal'
  },
  {
    label: 'Manufacturing, Transport & Logistics',
    value: 'manufacturing'
  },
  {
    label: 'Marketing & Communications',
    value: 'marketing'
  },
  {
    label: 'Mining, Resources & Energy',
    value: 'mining'
  },
  {
    label: 'Real Estate & Property',
    value: 'real'
  },
  {
    label: 'Retail & Consumer Products',
    value: 'retail'
  },
  {
    label: 'Sales',
    value: 'sales'
  },
  {
    label: 'Science & Technology',
    value: 'science'
  },
  {
    label: 'Sport & Recreation',
    value: 'sport'
  },
  {
    label: 'Trades & Services',
    value: 'trades'
  }
];

const yearsOptions: SelectOption[] = [];
let year = new Date().getFullYear();

while (--year > 1900) {
  yearsOptions.push({
    value: `${year}`,
    label: year
  });
}

const countryOptions: SelectOption[] = [
  {
    label: 'Switzerland',
    value: 'ch',
    component: (
      <div className="flag_option">
        <img src={flags.switzerland} width={16} />
        <span>Switzerland</span>
      </div>
    )
  },
  {
    label: 'Canada',
    value: 'ca',
    component: (
      <div className="flag_option">
        <img src={flags.canada} width={16} />
        <span>Canada</span>
      </div>
    )
  },
  {
    label: 'Japan',
    value: 'jp',
    component: (
      <div className="flag_option">
        <img src={flags.japan} width={16} />
        <span>Japan</span>
      </div>
    )
  },
  {
    label: 'Germany',
    value: 'de',
    component: (
      <div className="flag_option">
        <img src={flags.germany} width={16} />
        <span>Germany</span>
      </div>
    )
  },
  {
    label: 'Australia',
    value: 'au',
    component: (
      <div className="flag_option">
        <img src={flags.australia} width={16} />
        <span>Australia</span>
      </div>
    )
  },
  {
    label: 'United Kingdom',
    value: 'uk',
    component: (
      <div className="flag_option">
        <img src={flags.united_kingdom} width={16} />
        <span>United Kingdom</span>
      </div>
    )
  },
  {
    label: 'United States',
    value: 'us',
    component: (
      <div className="flag_option">
        <img src={flags.united_states} width={16} />
        <span>United States</span>
      </div>
    )
  },
  {
    label: 'Sweden',
    value: 'sw',
    component: (
      <div className="flag_option">
        <img src={flags.sweden} width={16} />
        <span>Sweden</span>
      </div>
    )
  },
];

export {
  industryOptions,
  yearsOptions,
  countryOptions
}
