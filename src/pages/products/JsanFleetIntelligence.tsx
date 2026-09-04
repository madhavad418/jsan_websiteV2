import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CloudOff,
  CloudSun,
  Database,
  FileDown,
  Gauge,
  GitCompare,
  History,
  Layers,
  Lock,
  MapPin,
  Monitor,
  Package,
  Radar,
  RefreshCw,
  Route,
  Satellite,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import SectionLabel from '../../components/SectionLabel'

/**
 * /products/fleet-intelligence  JSAN Fleet Intelligence.
 *
 * The flagship product page, written for the person who buys a delivery programme rather
 * than for the person who builds one. The argument is commercial: a tracking platform
 * reports kilometres, which is a number with nothing to compare it against, while this
 * reports how much of a contracted network is finished.
 *
 * Deliberately free of implementation detail and of programme volumes. Both appeared on an
 * earlier draft and both were removed: delivery figures are client information and belong in
 * a proposal, and the technology stack is not what a prospective client is choosing between.
 * Nothing on this page needs a caveat before it can be shown to anyone.
 */

/** What the product promises, in words rather than numbers. */
const HERO_PROMISES = [
  { icon: Radar, label: 'Starts on its own' },
  { icon: CloudOff, label: 'Works without a signal' },
  { icon: ClipboardCheck, label: 'Reports against the contract' },
]

/** The differentiators, each stated as the commercial outcome it produces. */
const DIFFERENTIATORS = [
  {
    icon: Radar,
    title: 'Nobody has to remember to start it',
    body:
      'Trips record themselves from the moment a vehicle begins moving and close when the work is done. Drivers sign in once and never think about it again, so the record is complete whether or not anyone remembered to press start.',
  },
  {
    icon: Layers,
    title: 'Progress measured against the contract',
    body:
      'Coverage is reported against the network you are actually contracted to deliver, not against the distance your vehicles happened to travel. Every figure has something to be measured against, so the question of how much remains always has an answer.',
  },
  {
    icon: ShieldCheck,
    title: 'Every road counted once',
    body:
      'When two crews pass down the same street, it counts once. Progress reflects the work delivered rather than the number of times a vehicle went past, which is the difference between a report a client accepts and one they query.',
  },
  {
    icon: Route,
    title: 'Distance you can defend',
    body:
      'Recorded drives are aligned to the roads they actually covered before anything is counted, so a partially driven street is never reported as a finished one and a repeat pass is recognised as a repeat.',
  },
  {
    icon: History,
    title: 'Numbers that stay the same',
    body:
      'Running the same report a month later returns the same result. A drive that uploads late takes its proper place in the history instead of quietly changing figures that have already been shared with a client.',
  },
  {
    icon: Database,
    title: 'Assets with a history, not just a holder',
    body:
      'Vehicles and devices carry a dated record of who held them and for how long. When a question about last quarter comes up, it is answered from the system rather than from memory.',
  },
  {
    icon: CloudOff,
    title: 'Nothing lost to poor coverage',
    body:
      'Work carried out where there is no mobile signal is recorded as it happens and reconciled into the right trip once a connection returns. A remote day looks the same in the record as a city one.',
  },
  {
    icon: GitCompare,
    title: 'Network changes without losing progress',
    body:
      'When a client issues an updated network, the coverage already achieved carries forward instead of resetting. Earlier reporting stays intact, so figures already agreed remain reproducible.',
  },
]

/** The three audiences, and what each of them opens. */
const SURFACES = [
  {
    icon: Smartphone,
    name: 'For drivers',
    audience: 'An app, installed once',
    body:
      'One sign-in on day one and nothing to operate after that. No paperwork at the end of a shift, no start and stop button to forget, and no penalty for working somewhere with no reception.',
    points: [
      'Automatic trip recording with no daily action',
      'Keeps working with no mobile signal',
      'Resumes on its own after a phone restart',
      'No extra hardware fitted to the vehicle',
    ],
  },
  {
    icon: Monitor,
    name: 'For operations',
    audience: 'A live view of the field',
    body:
      'Where every vehicle is now, what each one did earlier, and how much of the programme is finished. A supervisor can follow a shift as it happens and replay any drive afterwards without asking the driver to explain it.',
    points: [
      'Live fleet map with active and idle vehicles marked',
      'Replay of any completed drive as it happened',
      'Coverage dashboards by area and by client priority',
      'Alerts when a vehicle stops reporting',
    ],
  },
  {
    icon: Users,
    name: 'For the business',
    audience: 'Evidence for the client conversation',
    body:
      'Progress reporting a client can reconcile against their own records, asset custody that survives every reassignment, and exports in formats their own teams already open.',
    points: [
      'Progress reported in the client’s own areas and identifiers',
      'Custody reporting per driver, month by month',
      'Trip data supplied for the client’s own systems',
      'Access limited to each manager’s own crews and vehicles',
    ],
  },
]

/** The operating cycle, described the way it is experienced rather than implemented. */
const PIPELINE = [
  {
    step: '01',
    title: 'Drive',
    body: 'The vehicle sets off and the trip begins recording on its own. Nobody starts anything.',
  },
  {
    step: '02',
    title: 'Record',
    body: 'The route is captured continuously for the whole shift, with or without a connection.',
  },
  {
    step: '03',
    title: 'Reconcile',
    body: 'Anything captured out of signal syncs when the vehicle returns and joins the right trip.',
  },
  {
    step: '04',
    title: 'Complete',
    body: 'The trip closes when the work is genuinely finished, not when the signal happens to drop.',
  },
  {
    step: '05',
    title: 'Match',
    body: 'The drive is aligned to the roads it covered, so what is counted is what was actually driven.',
  },
  {
    step: '06',
    title: 'Credit',
    body: 'Newly covered roads are added to the programme total, each of them exactly once.',
  },
  {
    step: '07',
    title: 'Report',
    body: 'Progress rolls up by area and by client priority, ready to send without being reworked.',
  },
]

/** What is included, grouped the way an operations lead evaluates a system. */
const CAPABILITIES = [
  {
    icon: Satellite,
    group: 'Capture and reliability',
    items: [
      'Automatic trip recording with no driver action',
      'Full coverage of shifts driven out of mobile range',
      'Continues through phone restarts and battery management',
      'Speed, direction and stop detail for every drive',
      'No hardware to fit, recover or maintain',
    ],
  },
  {
    icon: Gauge,
    group: 'Coverage and measurement',
    items: [
      'Progress reported against the client’s own network',
      'Work broken down and dispatched by area',
      'Each road counted once across the whole fleet',
      'Repeat passes identified rather than double counted',
      'Rollups by area, client priority and road type',
    ],
  },
  {
    icon: Package,
    group: 'Assets and custody',
    items: [
      'Vehicle, device and driver registers',
      'Dated custody record for every asset',
      'Month-by-month custody reporting per driver',
      'Every handover records who moved it and when',
      'Existing assignments brought in without duplication',
    ],
  },
  {
    icon: FileDown,
    group: 'Reporting and export',
    items: [
      'Trip history filtered by driver, status and date',
      'Single-trip and bulk export in open formats',
      'Recorded route or matched route, chosen at export',
      'Large exports prepared in the background',
      'Drives replayable in standard mapping tools',
    ],
  },
  {
    icon: CloudSun,
    group: 'Crew welfare and support',
    items: [
      'Driving-condition guidance ahead of each day',
      'Judged for the kind of vehicles actually in the fleet',
      'Every location assessed in its own local day',
      'Accommodation search around a crew’s current position',
      'Nearest parcel and courier points for field returns',
    ],
  },
  {
    icon: Lock,
    group: 'Governance and access',
    items: [
      'Managers see only their own crews and vehicles',
      'Client data kept separate by programme',
      'Alerts raised once and cleared on recovery',
      'Live positions are always the current ones, never a stale view',
      'Every reported figure traceable to its source drive',
    ],
  },
]

/** The category comparison, kept to what a buyer would actually weigh up. */
const COMPARISON = [
  {
    question: 'Starting a trip',
    typical: 'The driver remembers, or a box is fitted to the vehicle',
    jsan: 'Automatic, from a phone the driver already carries',
  },
  {
    question: 'Losing signal',
    typical: 'A gap in the record, or a shift closed early',
    jsan: 'Recorded anyway and reconciled into the same trip',
  },
  {
    question: 'Measuring distance',
    typical: 'Straight-line totals between recorded positions',
    jsan: 'Aligned to the roads the vehicle actually covered',
  },
  {
    question: 'Reporting progress',
    typical: 'Kilometres driven, with nothing to compare them against',
    jsan: 'Share of the client network covered, by area and priority',
  },
  {
    question: 'Driving a road twice',
    typical: 'Counted twice',
    jsan: 'Counted once, credited to whoever covered it first',
  },
  {
    question: 'Asset history',
    typical: 'A current-holder field, overwritten on reassignment',
    jsan: 'A dated record, so last quarter can still be answered',
  },
  {
    question: 'An updated client network',
    typical: 'Start again and lose the progress recorded so far',
    jsan: 'Progress already achieved carries forward',
  },
]

/** Why it holds up commercially. No figure here needs anyone's approval to publish. */
const ASSURANCES = [
  {
    icon: ClipboardCheck,
    title: 'Ready for an audit',
    body: 'Every reported figure traces back to a specific road in the client’s own network and to the drive that covered it, which is what turns a progress meeting into a short one.',
  },
  {
    icon: Building2,
    title: 'Nothing to install in a vehicle',
    body: 'No fitting appointments, no units to recover when a vehicle leaves the fleet, and no waiting on hardware before a new market can begin work.',
  },
  {
    icon: RefreshCw,
    title: 'Built and operated in-house',
    body: 'JSAN runs its own field programmes on this platform. What is on the roadmap comes from operations, and support does not route through a third party.',
  },
]

export default function JsanFleetIntelligence() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/*
        Hero. The photograph carries it, so the wash over it is only as heavy as legibility
        needs and clears the vehicle entirely.

        Dark type on a light wash rather than the reverse, because this picture cannot take
        light type: the sky behind the headline puts white at about 1.3:1 and the road under
        the buttons puts navy at about 1.0:1, so the copy column crosses the horizon and one
        colour alone fails at one end or the other whichever is chosen.
      */}
      <section className="relative overflow-hidden" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="/pillars/atlas_hero.webp"
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            className="h-full w-full object-cover"
          />
          {/* Below lg the copy runs the full width, so a wash that fades out to the right
              would leave the end of every line sitting on bare photograph. */}
          <div className="absolute inset-0 bg-white/90 lg:hidden" />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                'linear-gradient(100deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.93) 34%, rgba(255,255,255,0.72) 52%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0) 82%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 lg:pb-24 lg:pt-36">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link
              to="/work"
              className="inline-flex min-h-[24px] items-center transition-colors hover:text-[#0050a9]"
            >
              Work
            </Link>
            <span>/</span>
            <Link
              to="/in-house-apps"
              className="inline-flex min-h-[24px] items-center transition-colors hover:text-[#0050a9]"
            >
              Platforms
            </Link>
            <span>/</span>
            <span className="font-medium text-[#0050a9]">JSAN ATLAS Ops</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#0a1a3a]/15 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#012f62] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0050a9]" />
            Industrial product &bull; Built and run in-house
          </span>

          <h1 className="t-display mb-6 max-w-4xl text-[#0a1a3a]">
            Every kilometre driven, matched to the road it belongs to.
          </h1>

          <p className="mb-9 max-w-2xl text-[19px] leading-relaxed text-gray-700 lg:text-[21px]">
            A tracking platform answers where the vehicle is. JSAN ATLAS Ops answers the
            question a delivery programme is actually judged on{' '}
            <strong className="font-semibold text-[#0a1a3a]">how much of the contracted network is finished</strong>{' '}
            and it does it without asking a single driver to press start.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/contact"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-lg bg-[#0050a9] px-8 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#013e82]"
            >
              Request a walkthrough
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-lg border border-[#0a1a3a]/25 bg-white/60 px-8 font-semibold text-[#0a1a3a] backdrop-blur-sm transition-colors duration-300 hover:bg-white"
            >
              See how it works
            </a>
          </div>

          {/* The promise in three short statements. Deliberately not a statistics strip:
              programme volumes are client information and do not belong on a public page. */}
          <div className="mt-14 flex flex-col gap-6 border-t border-[#0a1a3a]/15 pt-10 sm:flex-row sm:flex-wrap sm:gap-x-14 sm:gap-y-6">
            {HERO_PROMISES.map((promise) => (
              <div key={promise.label} className="flex items-center gap-3.5">
                <promise.icon className="h-5 w-5 shrink-0 text-[#0050a9]" aria-hidden="true" />
                <span className="font-semibold text-[#0a1a3a]">{promise.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The argument, stated once, in the largest type on the page after the headline. */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <SectionLabel>The problem it solves</SectionLabel>
              <h2 className="t-section mb-10 text-[#0a1a3a]">
                A fleet map is not a delivery report.
              </h2>
              <p className="border-l-2 border-[#0050a9] pl-6 text-[19px] font-medium leading-relaxed text-[#0a1a3a]">
                The primary output is not a map. It is a percentage that both sides of a contract
                can agree on.
              </p>
            </div>
            <div className="space-y-6 lg:pt-3">
              <p className="t-body text-gray-600">
                Field programmes are contracted against a network: a set of areas and a list of roads
                a client requires to be driven. Conventional fleet tracking reports kilometres
                travelled, which is a number with nothing to compare it against. It cannot say how
                much of the job remains, and it counts the same street again every time a crew passes
                down it.
              </p>
              <p className="t-body text-gray-600">
                JSAN ATLAS Ops was built the other way round. The client&rsquo;s own network
                is the reference. A drive is only worth something when it covers part of it, each part
                counts exactly once, and progress is reported in the client&rsquo;s own areas under
                their own identifiers.
              </p>
              <p className="t-body text-gray-600">
                Everything else follows from that one decision. Distance is measured against the roads
                actually covered rather than in straight lines. Progress is a record of what has been
                delivered rather than a running total. And the same drive always produces the same
                number, however many times the report is run.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators. Numbered editorial rows rather than a wall of cards. */}
      <section className="section-y bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl lg:mb-20">
            <SectionLabel>What makes it different</SectionLabel>
            <h2 className="t-section mb-7 text-[#0a1a3a]">
              Eight things conventional fleet tracking does not do
            </h2>
            <p className="t-body measure text-gray-600">
              Each of these exists because the obvious approach was tried first and produced a number
              that could not be defended in front of a client.
            </p>
          </div>

          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            {DIFFERENTIATORS.map((item, i) => (
              <div key={item.title} className="border-t border-gray-300 pt-7">
                <div className="mb-5 flex items-center gap-4">
                  <item.icon className="h-6 w-6 shrink-0 text-[#0050a9]" aria-hidden="true" />
                  <span className="t-label text-gray-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="t-sub mb-4 text-[#0a1a3a]">{item.title}</h3>
                <p className="leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage, with the network artwork carrying it. */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-stretch gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            {/* Two frames rather than one tall one: the screen the work is watched on, and
                the network it is being measured against. One image stretched to the height of
                this column had to be cropped so hard that neither idea survived it. */}
            <div className="order-2 grid gap-5 lg:order-1 lg:min-h-[560px] lg:grid-rows-2">
              {[
                {
                  src: '/pillars/jsan_atlasops.webp',
                  alt: 'The operations view following a vehicle along its route, coloured by speed',
                  width: 1672,
                  height: 941,
                },
                {
                  src: '/pillars/atlsops.webp',
                  alt: 'A collection vehicle on a city street, with the road network it is covering drawn over the road',
                  width: 1536,
                  height: 1024,
                },
              ].map((shot) => (
                <div
                  key={shot.src}
                  className="relative h-56 overflow-hidden rounded-sm sm:h-64 lg:h-auto"
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <SectionLabel>The coverage record</SectionLabel>
              <h2 className="t-section mb-7 text-[#0a1a3a]">
                Their network. Their identifiers. One count per road.
              </h2>
              <p className="t-body mb-8 text-gray-600">
                A client&rsquo;s network is reviewed before it is used, not after. The review answers
                the questions that are cheap now and expensive in three months  whether the
                identifiers are unique, how much of the network sits outside the agreed boundary, and
                which areas carry priority. Somebody signs that review off before a single road is
                committed to the programme.
              </p>

              <div className="grid gap-x-10 gap-y-7 border-t border-gray-300 pt-8 sm:grid-cols-2">
                {[
                  {
                    icon: MapPin,
                    title: 'Areas, not just points',
                    body: 'Crews are dispatched by area and progress is reported by area, using the client’s own area codes.',
                  },
                  {
                    icon: Route,
                    title: 'Roads, not kilometres',
                    body: 'Progress is recorded road by road, so a partially driven street is never reported as a finished one.',
                  },
                  {
                    icon: RefreshCw,
                    title: 'Re-drives without loss',
                    body: 'Next year’s cycle can reset progress without disturbing the network or the reporting that came before it.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Reconcilable both ways',
                    body: 'Every figure traces back to a road in the file the client sent, which is what makes an audit short.',
                  },
                ].map((cell) => (
                  <div key={cell.title}>
                    <cell.icon className="mb-3 h-5 w-5 text-[#0050a9]" aria-hidden="true" />
                    <h3 className="mb-2 text-[17px] font-bold text-[#0a1a3a]">{cell.title}</h3>
                    <p className="text-[15px] leading-relaxed text-gray-600">{cell.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The operating cycle. */}
      <section id="how-it-works" className="jump-target section-y bg-[#0b1017]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl lg:mb-20">
            <SectionLabel tone="dark">How it works</SectionLabel>
            <h2 className="t-section mb-7 text-white">
              From a turn of the wheel to a line on a progress report
            </h2>
            <p className="t-body measure text-white/60">
              Seven stages. The driver participates in exactly none of them.
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((stage) => (
              <li key={stage.step} className="bg-[#0b1017] p-7 lg:p-8">
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="text-[28px] font-bold leading-none text-[#00d4ff]">{stage.step}</span>
                </div>
                <h3 className="mb-3 text-[19px] font-bold text-white">{stage.title}</h3>
                <p className="text-[15px] leading-relaxed text-white/60">{stage.body}</p>
              </li>
            ))}
            {/* A closing cell rather than a ragged grid: it carries the point of the sequence. */}
            <li className="bg-[#101822] p-7 lg:p-8">
              <CheckCircle2 className="mb-5 h-7 w-7 text-[#00d4ff]" aria-hidden="true" />
              <h3 className="mb-3 text-[19px] font-bold text-white">Consistent</h3>
              <p className="text-[15px] leading-relaxed text-white/60">
                The same drive always produces the same number, however many times it is reported.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Who it is for. */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-3xl">
              <SectionLabel>Inside the platform</SectionLabel>
              <h2 className="t-section mb-7 text-[#0a1a3a]">Three audiences, one record</h2>
              <p className="t-body measure text-gray-600">
                A phone in the vehicle, a screen in the operations room and the reporting that goes to
                the client. Nothing to fit, no installation appointment, and nothing to recover when a
                vehicle leaves the fleet.
              </p>
            </div>
          </div>

          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-3">
            {SURFACES.map((surface) => (
              <div key={surface.name} className="border-t-2 border-[#0050a9] pt-8">
                <surface.icon className="mb-6 h-7 w-7 text-[#0050a9]" aria-hidden="true" />
                <h3 className="t-sub mb-2 text-[#0a1a3a]">{surface.name}</h3>
                <div className="mb-6 text-[13px] font-medium uppercase tracking-[0.12em] text-gray-500">
                  {surface.audience}
                </div>
                <p className="mb-7 leading-relaxed text-gray-600">{surface.body}</p>
                <ul className="space-y-3.5">
                  {surface.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-gray-600">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0050a9]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for where tracking usually breaks. Photographic band, kept short. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pillars/tunnols.webp"
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(4,15,34,0.95) 0%, rgba(6,26,58,0.88) 55%, rgba(6,26,58,0.55) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <SectionLabel tone="dark">Field reality</SectionLabel>
            <h2 className="t-section mb-8 text-white">
              Built for the conditions that break tracking software
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CloudOff,
                title: 'No coverage for hours',
                body: 'A day spent out of signal is recorded in full and reconciled once the vehicle is back in range.',
              },
              {
                icon: Building2,
                title: 'Tunnels and car parks',
                body: 'Time spent under cover does not end a shift early or leave a hole in the record.',
              },
              {
                icon: RefreshCw,
                title: 'Phones that get shut down',
                body: 'Recording resumes on its own after a restart, without anyone being asked to check.',
              },
              {
                icon: Bell,
                title: 'Nobody watching the screen',
                body: 'If a vehicle stops reporting, the manager responsible is told rather than finding out later.',
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-white/20 pt-6">
                <item.icon className="mb-4 h-6 w-6 text-[#00d4ff]" aria-hidden="true" />
                <h3 className="mb-2.5 text-[17px] font-bold text-white">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-white/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability matrix. */}
      <section className="section-y bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl lg:mb-20">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="t-section mb-7 text-[#0a1a3a]">What is in the platform</h2>
            <p className="t-body measure text-gray-600">
              Grouped the way an operations lead evaluates a system, rather than the way a
              feature list is usually written.
            </p>
          </div>

          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((block) => (
              <div key={block.group}>
                <div className="mb-6 flex items-center gap-3.5 border-b border-gray-300 pb-5">
                  <block.icon className="h-5 w-5 shrink-0 text-[#0050a9]" aria-hidden="true" />
                  <h3 className="text-[17px] font-bold text-[#0a1a3a]">{block.group}</h3>
                </div>
                <ul className="space-y-3.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray-600">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0050a9]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison. A table, because a table is what this argument wants. */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl lg:mb-16">
            <SectionLabel>Compared</SectionLabel>
            <h2 className="t-section mb-7 text-[#0a1a3a]">
              The same seven questions, answered twice
            </h2>
            <p className="t-body measure text-gray-600">
              Left is how the category generally behaves. Right is what this platform does instead,
              and why it was worth building rather than buying.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">
                Conventional vehicle tracking compared with JSAN ATLAS Ops
              </caption>
              <thead>
                <tr className="border-b-2 border-[#0a1a3a]">
                  <th scope="col" className="py-4 pr-6 t-label text-gray-500">
                    Question
                  </th>
                  <th scope="col" className="py-4 pr-6 t-label text-gray-500">
                    Conventional tracking
                  </th>
                  <th scope="col" className="py-4 t-label text-[#0050a9]">
                    JSAN ATLAS Ops
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.question} className="border-b border-gray-200 align-top">
                    <th scope="row" className="py-6 pr-6 font-bold text-[#0a1a3a]">
                      {row.question}
                    </th>
                    <td className="py-6 pr-6 text-[15px] leading-relaxed text-gray-500">
                      {row.typical}
                    </td>
                    <td className="py-6 text-[15px] font-medium leading-relaxed text-[#0a1a3a]">
                      {row.jsan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why it holds up commercially. */}
      <section className="section-y bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
            <div>
              <SectionLabel>Why it holds up</SectionLabel>
              <h2 className="t-section mb-7 text-[#0a1a3a]">Made for the client conversation</h2>
              <p className="t-body text-gray-600">
                The point of the platform is the meeting where progress is reviewed. Everything it
                records is there so that meeting can be a short one: what was covered, when, by whom,
                and how much of the programme remains.
              </p>
            </div>

            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-3 lg:pt-3">
              {ASSURANCES.map((item) => (
                <div key={item.title} className="border-t border-gray-300 pt-7">
                  <item.icon className="mb-5 h-6 w-6 text-[#0050a9]" aria-hidden="true" />
                  <h3 className="mb-3 text-[17px] font-bold text-[#0a1a3a]">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-gray-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where it fits, then out to the rest of the site. */}
      <section className="section-y-sm bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-3 inline-block t-label text-gray-500">Where it is used</span>
              <h2 className="mb-6 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[30px]">
                Programmes contracted against a network
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms' },
                  { name: 'Government & Smart Cities', href: '/industries/government-smart-cities' },
                  { name: 'Utilities', href: '/industries/utilities' },
                  { name: 'Telecommunications', href: '/industries/telecommunications' },
                  { name: 'Global Fleet & Field Operations', href: '/capabilities/global-fleet-field-operations' },
                ].map((link) => (
                  <Link
                    key={link.href + link.name}
                    to={link.href}
                    className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-blue-100 bg-white px-4 text-sm font-medium text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9] hover:shadow-sm"
                  >
                    {link.name}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-3 inline-block t-label text-gray-500">More platforms</span>
              <h2 className="mb-6 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[30px]">
                Other systems JSAN builds and runs
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'JSAN VTS', label: 'Vehicle Tracking System', href: '/products/jsan-vts' },
                  { name: 'JSAN POI Express', label: 'GIS Data Collection Platform', href: '/products/poi-express' },
                  { name: 'JSAN GeoDiscover', label: 'Cross-Provider POI Discovery', href: '/products/geodiscover' },
                ].map((product) => (
                  <Link
                    key={product.href}
                    to={product.href}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9]/30 hover:shadow-md"
                  >
                    <span>
                      <span className="mb-1 block t-label text-gray-500">{product.label}</span>
                      <span className="font-bold text-[#0a1a3a]">{product.name}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#0050a9] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-5 text-[28px] font-bold text-white lg:text-[38px]">
            Bring us your delivery network
          </h2>
          <p className="mb-9 text-lg leading-relaxed text-white/75">
            Tell us the areas and the roads you are contracted to cover. We will review the network
            with you, agree what counts as covered, and run a pilot against the real target rather
            than a demonstration dataset.
          </p>
          <Link
            to="/contact"
            className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-lg bg-white px-8 font-semibold text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Talk to our team
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
