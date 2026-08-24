import type { LucideIcon } from 'lucide-react'
import {
  Map,
  Truck,
  Brain,
  Antenna,
  Code,
  Handshake,
  Users,
  MessageSquare,
} from 'lucide-react'

/**
 * The contact form's opening question and what each answer asks for next.
 *
 * A single generic "name / email / message" form tells the business nothing about the
 * enquiry until someone reads it. Asking what the conversation is about first, then
 * showing three or four fields that actually matter for that answer, means an enquiry
 * arrives already qualified  geography and data types for a mapping program, roles and
 * headcount for a workforce request  without making anyone fill in a long form.
 *
 * Every field renders a native input with a `name`, so the values post to FormSubmit with
 * the rest of the form and appear in the notification email. Nothing here is required:
 * a visitor who ignores the extra fields still gets a working contact form.
 */
export type EnquiryField =
  | { name: string; label: string; type: 'text'; placeholder?: string }
  | { name: string; label: string; type: 'select'; options: string[] }
  | { name: string; label: string; type: 'chips'; options: string[] }

export type EnquiryTopic = {
  id: string
  /** Written into the enquiry_topic field, so keep it readable in an inbox. */
  label: string
  icon: LucideIcon
  /** One line under the field group explaining why we are asking. */
  hint: string
  fields: EnquiryField[]
}

const GEOGRAPHY: EnquiryField = {
  name: 'geography',
  label: 'Countries or regions',
  type: 'text',
  placeholder: 'e.g. Germany, Austria, Poland',
}

const TIMING: EnquiryField = {
  name: 'timing',
  label: 'Target start',
  type: 'select',
  options: ['Not decided', 'Within 1 month', '1–3 months', '3–6 months', 'Next budget cycle'],
}

export const enquiryTopics: EnquiryTopic[] = [
  {
    id: 'geospatial',
    label: 'Geospatial & Mapping',
    icon: Map,
    hint: 'Where the programme runs and what has to come out of it.',
    fields: [
      GEOGRAPHY,
      {
        name: 'data_types',
        label: 'Data required',
        type: 'chips',
        options: [
          'Street-level imagery',
          'LiDAR',
          'Road network',
          'POI & addresses',
          'Field verification',
          'QA only',
        ],
      },
      TIMING,
    ],
  },
  {
    id: 'fleet',
    label: 'Fleet / Field Operations',
    icon: Truck,
    hint: 'What has to be stood up, where, and for how long.',
    fields: [
      GEOGRAPHY,
      {
        name: 'operation_scope',
        label: 'What you need mobilised',
        type: 'chips',
        options: [
          'Vehicles & sensor rigs',
          'Drivers & crews',
          'Drive planning & dispatch',
          'Tracking & telematics',
          'Maintenance & logistics',
          'Permits & compliance',
        ],
      },
      {
        name: 'duration',
        label: 'Expected duration',
        type: 'select',
        options: ['Not decided', 'One-off capture', 'Under 6 months', '6–12 months', 'Ongoing / recurring'],
      },
    ],
  },
  {
    id: 'geoai',
    label: 'GeoAI & Data',
    icon: Brain,
    hint: 'What the data is, and what it has to become.',
    fields: [
      {
        name: 'input_data',
        label: 'Source data',
        type: 'chips',
        options: ['Street imagery', 'Aerial / satellite', 'LiDAR point cloud', 'Existing GIS', 'Mixed / unsure'],
      },
      {
        name: 'output_needed',
        label: 'Output needed',
        type: 'chips',
        options: [
          'Feature extraction',
          'Object detection',
          'Annotation / training data',
          'Change detection',
          'Validation & QA',
        ],
      },
      {
        name: 'volume',
        label: 'Approximate volume',
        type: 'text',
        placeholder: 'e.g. 40,000 km of imagery, 2M assets',
      },
    ],
  },
  {
    id: 'telecom',
    label: 'Telecom & Infrastructure',
    icon: Antenna,
    hint: 'Network type and the state of the record today.',
    fields: [
      {
        name: 'network_type',
        label: 'Network type',
        type: 'select',
        options: ['Fibre / FTTx', 'Wireless / 5G', 'Electricity', 'Water or gas', 'Mixed'],
      },
      {
        name: 'telecom_scope',
        label: 'Scope',
        type: 'chips',
        options: [
          'Field survey',
          'Pole & asset intelligence',
          'LiDAR engineering',
          'Network GIS',
          'As-built validation',
          'Design & planning',
        ],
      },
      GEOGRAPHY,
    ],
  },
  {
    id: 'engineering',
    label: 'Digital Engineering',
    icon: Code,
    hint: 'What has to be built, and who uses it.',
    fields: [
      {
        name: 'system_type',
        label: 'What you need built',
        type: 'chips',
        options: [
          'Web GIS',
          'Operational dashboard',
          'Mobile application',
          'APIs & integration',
          'Data pipeline',
          'Enterprise platform',
        ],
      },
      {
        name: 'users',
        label: 'Who will use it',
        type: 'text',
        placeholder: 'e.g. 200 field crews and a planning team',
      },
      TIMING,
    ],
  },
  {
    id: 'partnership',
    label: 'Partnership',
    icon: Handshake,
    hint: 'How you would like to work together.',
    fields: [
      {
        name: 'partnership_type',
        label: 'Partnership type',
        type: 'select',
        options: [
          'Delivery / subcontract partner',
          'Technology or data partner',
          'Reseller or channel',
          'Joint bid',
          'Something else',
        ],
      },
      { name: 'partner_regions', label: 'Regions you cover', type: 'text', placeholder: 'e.g. Nordics, DACH' },
    ],
  },
  {
    id: 'workforce',
    label: 'Staffing / Workforce',
    icon: Users,
    hint: 'Roles, headcount and where they need to be.',
    fields: [
      { name: 'roles', label: 'Roles needed', type: 'text', placeholder: 'e.g. GIS analysts, survey crews' },
      { name: 'headcount', label: 'Approximate headcount', type: 'text', placeholder: 'e.g. 12' },
      {
        name: 'engagement',
        label: 'Engagement type',
        type: 'select',
        options: ['Not decided', 'Contract', 'Permanent', 'Team augmentation', 'Fully managed team'],
      },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    icon: MessageSquare,
    hint: '',
    fields: [],
  },
]

export const topicById = (id: string | null) => enquiryTopics.find((t) => t.id === id)
