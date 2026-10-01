--- EVE HANDOFF ---
DONE: theme niche aircraft_detail (quote_first) + prior auto_parts (quote_first) + prior crack_sealing (quote_first) + prior line_striping (quote_first) + prior asphalt_paving (quote_first) + prior sealcoating (quote_first) + prior roof_cleaning (quote_first) + prior lawn_care (quote_first) + prior snow_removal (quote_first) + prior duct_cleaning (quote_first) + prior dryer_vent_cleaning (quote_first) + prior kitchen_hood_cleaning (quote_first) + prior grease_trap_cleaning (quote_first) + prior septic_pumping (quote_first) + prior wildlife_removal (quote_first) + prior radon_mitigation (quote_first) + prior sump_pump (quote_first) + prior crawl_space_encapsulation (quote_first) + prior basement_waterproofing (quote_first) + prior french_drain (quote_first) + prior retaining_wall (quote_first) + prior stump_grinding (quote_first) + prior gutter_guards (quote_first) + prior storage_container_rental (quote_first) + prior porta_potty_rental (quote_first) + prior dumpster_rental (quote_first) + prior awning (quote_first) + prior carport (quote_first) + prior gazebo (quote_first) + prior pergola (quote_first) + prior irrigation (quote_first) + prior patio_cover (quote_first) + prior ev_charger (quote_first) + prior generator (quote_first) + prior window_replacement (quote_first) + prior chimney (quote_first) + prior epoxy_flooring (quote_first) + prior solar (quote_first) + prior foundation_repair (quote_first) + prior auto_detail (quote_first) + prior landscaping (quote_first) + prior countertops (quote_first) + prior cabinets (quote_first) + prior tile (quote_first) + prior insulation (quote_first) + prior drywall (quote_first) + prior masonry (quote_first) + prior decking (quote_first) + prior siding (quote_first) + prior concrete (quote_first) + prior fencing (quote_first) + prior flooring (quote_first) + prior handyman (hybrid) + prior appliance_repair (call_first) + prior carpet_cleaning (quote_first) + prior window_cleaning/gutter_cleaning/pressure_washing/junk_removal/slab_leak/tree_service/mold_remediation/fire_smoke/towing+water/garage+locksmith+janitorial; free audit estimates + CRM status API (ESTIMATES ONLY); Front Door SEO robots.ts + sitemap.ts (PR #28); Front Door security headers (nosniff/Referrer-Policy/X-Frame DENY/Permissions-Policy)
NEXT: Ian Stripe Production env (4 required names) → redeploy → re-verify $49 Starter checkout
BLOCKER: Stripe Production env Ian-only
NEED FROM EVE: no
LIVE URL: https://apex-hq-five.vercel.app
--- END HANDOFF ---

# Apex HQ — Build Spec (Module 0.1)

Companion to MASTER_BLUEPRINT.md. Worker updates STATUS only for finished work.

## STATUS (this run)

- [x] Clone repo / scaffold Next.js 14 App Router + TS + Tailwind + shadcn/ui
- [x] supabase/migrations SQL for businesses, profiles, calls, appointments, leads, subscriptions, templates, ai_response_logs (+ RLS stubs)
- [x] .env.example for all services
- [x] Onboarding wizard at /onboarding
- [x] Template library: HVAC, plumber, salon (config-driven)
- [x] Theme niches through painting (+ heroes, CTA modes call_first/book_first/hybrid) on CallRail-safe public site
- [x] Theme niches garage + locksmith (call_first) + janitorial (quote_first) — PR #22
- [x] Theme niches towing + water_damage (call_first) — Builder clean rebase of #14
- [x] Theme niche fire_smoke (call_first) — board-up / FSRT honesty
- [x] Theme niche mold_remediation (call_first) — calm trust / IICRC / TX assessor-remediator honesty
- [x] Theme niche tree_service (call_first) — storm/emergency honesty / powerline / ISA-TRAQ when true
- [x] Theme niche slab_leak (call_first) — detection-first / TSBPE-RMP honesty / TX geo-gated clay copy
- [x] Theme niche junk_removal (quote_first) — charcoal/slate + lime; dump fees up front; no fake same-day
- [x] Theme niche pressure_washing (quote_first) — wet-concrete slate + sky-spray; surface-safe; quote before wash
- [x] Theme niche gutter_cleaning (quote_first) — zinc roof-edge + deep copper; clogged downspouts; soft-wash vs power; height honesty
- [x] Theme niche window_cleaning (quote_first) — clear-glass cool blue-gray + daylight ice; glass-safe; quote before climb
- [x] Theme niche carpet_cleaning (quote_first) — warm soft-gray + seafoam/teal; quote before steam; pet/kid-safe when true
- [x] Theme niche appliance_repair (call_first) — slate + orange; diagnose-before-parts; licensed tech when true
- [x] Theme niche handyman (hybrid) — warm workbench taupe/slate + amber/gold; quote/schedule primary + Call secondary
- [x] Theme niche flooring (quote_first) — warm oak/charcoal slate + copper/bronze; material/subfloor assess before firm price; no bait flat sqft
- [x] Theme niche fencing (quote_first) — cedar/fence-stain warm brown + charcoal slate + forest sage; length/height/terrain/HOA assess before firm price; no bait flat $/ft
- [x] Theme niche concrete (quote_first) — wet-concrete cool gray/slate + warm amber; sqft/access/thickness/prep/drainage assess before firm price; no bait flat $/sqft; no fake same-day pour
- [x] Theme niche siding (quote_first) — cool clapboard slate/gray + soft coastal blue-gray; material/grade/sqft/stories/access/substrate assess before firm price; no bait flat $/sqft; no fake same-day install; vinyl/fiber-cement/wood/engineered when true
- [x] Theme niche decking (quote_first) — warm deck-board teak + charcoal slate + soft sage; sqft/height/access/footing/material wood-composite-PVC assess before firm price; no bait flat $/sqft or $/lf; no fake same-day build; HOA/permit honesty when true
- [x] Theme niche masonry (quote_first) — kiln brick + limestone/sand; sqft/access/material brick-stone-block/mortar/height assess before firm price; no bait flat $/sqft; no fake same-day build; HOA/permit honesty when true; quote before build/repair
- [x] Theme niche drywall (quote_first) — cool gypsum/joint-compound white-gray + soft tape-beige; sqft/access/rooms/texture smooth-orange-peel-knockdown/damage water-nail pops-seam/height assess before firm price; no bait flat $/sqft; no fake same-day; HOA/permit honesty when true; quote before hang/finish/repair
- [x] Theme niche insulation (quote_first) — warm cellulose/attic taupe-slate + soft insulation-pink; sqft/access/attic-vs-wall-vs-crawl/existing R-value/moisture-ventilation/height assess before firm price; no bait flat $/sqft; no fake same-day; HOA/permit honesty when true; quote before blow-in/batts/spray-foam
- [x] Theme niche tile (quote_first) — cool porcelain gray/slate + soft grout-beige; sqft/access/substrate/material porcelain-ceramic-natural-stone/grout/height/waterproofing assess before firm price; no bait flat $/sqft; no fake same-day; HOA/permit honesty when true; quote before install/repair
- [x] Theme niche cabinets (quote_first) — warm walnut/charcoal + soft brass; linear-ft/access/existing-vs-new/material/layout measure before firm price; no bait flat $/lf or $/cabinet; no fake same-day; HOA/permit honesty when true; quote before install/refacing
- [x] Theme niche foundation_repair (quote_first) — deep charcoal + copper; inspection/assess before firm price; no bait $/lf or $/pier
- [x] Theme niche solar (quote_first) — deep slate + solar gold/amber; roof/utility/net-metering/battery/HOA assess before firm price; no bait flat $/watt; no fake same-day install; licensed electrician/solar contractor honesty when required
- [x] Theme niche epoxy_flooring (quote_first) — deep epoxy charcoal + gloss resin teal/cyan; sqft/prep/moisture/existing-coating/access assess before firm price; no bait flat $/sqft; no fake same-day cure; garage & commercial epoxy honesty
- [x] Theme niche chimney (quote_first) — flue soot charcoal `#1f1a17` + creosote copper-orange `#c2410c`; flue type/height/creosote/liner/cap/access/stories/wood-stove-vs-fireplace assess before firm price; no bait flat $/sweep; no fake same-day; no scare copy; CSIA/NFI / licensed honesty when true; quote before sweep or repair
- [x] Theme niche window_replacement (quote_first) — frame slate `#1e293b` + sky accent `#0ea5e9`; count/size/stories/access/existing-vs-new/vinyl-vs-wood-vs-fiberglass-vs-aluminum/energy-rating assess before firm price; no bait flat $/window; no fake same-day; licensed honesty when true; quote before install; distinct from window_cleaning
- [x] Theme niche generator (quote_first) — deep charcoal/slate `#0f172a` + safety amber `#f59e0b`; whole-home load/fuel (NG/LP/diesel)/automatic transfer switch/pad-setback/permit-HOA assess before firm price; no bait flat $/kW; no fake same-day install; licensed electrician honesty when true; quote before install; distinct from solar and portable camping power stations
- [x] Theme niche ev_charger (quote_first) — deep electrical slate `#0b1220` + EV electric green `#22c55e`; panel capacity/amperage (30–60A typical L2)/garage-vs-driveway/hardwired-vs-NEMA/permit-HOA/load calculation assess before firm price; no bait flat $/charger; no fake same-day install; licensed electrician honesty when true; quote before install; distinct from solar-only and standby generator
- [x] Theme niche patio_cover (quote_first) — deep shade charcoal `#1c1917` + warm bronze `#b45309`; sqft/attached-vs-freestanding/material (aluminum/wood/insulated/fabric-shade when true)/footings/drainage/access/stories/HOA-permit assess before firm price; no bait flat $/sqft or $/lf; no fake same-day; licensed contractor honesty when true; quote before build; distinct from decking, concrete flatwork, gutter_cleaning, and fencing
- [x] Theme niche irrigation (quote_first) — deep turf charcoal/slate `#0f1f17` + bright sprinkler-sky/teal `#2dd4bf`; lot/zone count/head types/controller age/backflow/water pressure/dig access/winterize-vs-repair-vs-new-install/HOA-permit assess before firm price; no bait flat $/zone or $/head; no fake same-day; licensed plumber/irrigation contractor honesty when true; quote before dig or rewire; distinct from landscaping beds/mow
- [x] Theme niche pergola (quote_first) — deep timber/charcoal `#1a1510` + soft cedar/amber `#d97706`; footprint/sqft/attached-vs-freestanding/material (wood/vinyl/aluminum/composite when true)/post-footing depth/roof style (open-beam vs lattice vs solid-roof kit)/height-stories-access/HOA-permit assess before firm price; no bait flat $/sqft or $/lf; no fake same-day; licensed contractor honesty when true; quote before build; distinct from patio_cover solid shade canopy, decking floor platforms, fencing, landscaping beds/mow, irrigation zones
- [x] Theme niche gazebo (quote_first) — deep pavilion green/slate `#14241c` + soft copper/brass `#c2410c`; footprint/sqft/roof style (full/hip/octagon)/screen-rail kit/foundation-floor optional/material/height-access/HOA-permit assess before firm price; no bait flat $/sqft or $/lf; no fake same-day; licensed contractor honesty when true; quote before build; distinct from pergola open-beam/lattice shade, patio_cover attached solid canopy, decking floor platforms, fencing, landscaping beds/mow, irrigation zones
- [x] Theme niche carport (quote_first) — deep asphalt charcoal/slate `#0f1419` + cool zinc/steel `#64748b`; bay count / footprint/sqft / attached-vs-freestanding / material (metal/wood/poly when true) / roof pitch-panels / post-footing / pad existing-vs-new / vehicle height clearance / wind-snow load when true / access / HOA-permit assess before firm price; no bait flat $/sqft or $/lf or $/bay; no fake same-day; licensed contractor honesty when true; quote before build; distinct from gazebo pavilion/people outdoor room, pergola open-beam/lattice shade, patio_cover solid patio shade canopy, decking floor platforms, garage enclosed door/opener, fencing, landscaping, irrigation, concrete flatwork alone
- [x] Theme niche awning (quote_first) — deep canopy charcoal/slate `#14181f` + soft awning canvas/terracotta `#c45c26`; width/projection (lf/ft) / retractable-vs-fixed / fabric-vs-aluminum-vs-vinyl when true / mount wall-vs-roof / motorized-vs-manual when true / sun-wind rating when true / stories-access / HOA-permit assess before firm price; no bait flat $/lf or $/sqft; no fake same-day; licensed contractor honesty when true; quote before install; distinct from patio_cover solid permanent canopy, pergola open-beam freestanding/attached shade frame, gazebo pavilion, carport vehicle shelter, decking, fencing, landscaping, irrigation, concrete flatwork alone
- [x] Theme niche dumpster_rental (quote_first) — deep dumpster iron charcoal `#1f1b16` + caution yellow/amber `#eab308`; size (10/20/30/40 yd when true) / rental duration / debris type / delivery access / driveway protection / permit-HOA educational only assess before firm price; no bait flat $/day; no fake same-day drop; licensed/hauler honesty when true; quote before delivery; distinct from junk_removal hauling labor, porta_potty_rental, storage_container_rental, septic_pumping, grease_trap_cleaning, concrete debris alone
- [x] Theme niche porta_potty_rental (quote_first) — portable-unit plastic slate `#2c3542` + soft sanitation mint `#5eead4`; unit count / event days vs jobsite duration / delivery access / ADA unit need / restock-service cadence / waste pump-out schedule assess before firm price; no bait flat $/day or $/weekend; no fake same-day drop; local permit/HOA educational only (not legal advice); licensed/hauler when true; quote before delivery; distinct from dumpster_rental roll-off, junk_removal hauling labor, septic_pumping, grease_trap_cleaning, storage_container_rental
- [x] Theme niche storage_container_rental (quote_first) — weathered steel / container corrugation zinc `#3f3f46` + muted rust `#c2410c`; size (10/20/40 ft) / delivery-pickup access & crane-tilt-bed / ground-surface / rental duration (days/weeks/months) / lock-security / residential vs jobsite assess before firm price; no bait flat $/day or $/month; no fake same-day delivery; local permit/HOA educational only (not legal advice); quote before delivery; distinct from dumpster_rental roll-off, porta_potty_rental toilets, junk_removal hauling, moving labor, septic_pumping, grease_trap_cleaning
- [x] Theme niche gutter_guards (quote_first) — deep zinc/gutter-metal `#27272a` + leaf-guard forest green `#15803d`; linear-ft / stories-height / roof pitch-access / existing gutter type (K-style/half-round/box) / guard material (micro-mesh/brush/screen/helmet-style when true — no competitor brand names) / debris-leaf load / downspout count / HOA-permit educational assess before firm price; no bait flat $/lf; no fake same-day; licensed contractor honesty when true; quote before install; distinct from gutter_cleaning flush service, roofing, pressure_washing, siding, and fascia alone
- [x] Theme niche retaining_wall (quote_first) — deep basalt slate `#1e293b` + warm sandstone gold `#ca8a04`; height/lf/soil/drainage/toe-heel footing/material (block/timber/stone/poured when true)/surcharge-load/access/existing-vs-new/HOA-permit assess before firm price; no bait flat $/lf or $/sqft; no fake same-day; local permit/HOA educational only (not legal advice); licensed contractor/engineer honesty when required; distinct from concrete flatwork, masonry, fencing, landscaping, foundation_repair, stump_grinding
- [x] Theme niche french_drain (quote_first) — deep drainage slate `#1e3a4c` + soft trench copper `#b87333`; length/depth/soil type/daylight-vs-sump/yard access-slope/buried utilities/existing-vs-new trench/gravel-pipe sizing when true/surface-vs-subsurface/HOA-permit educational assess before firm price; no bait flat $/lf; no fake same-day dig; local permit/HOA educational only (not legal advice); licensed contractor honesty when required; quote before dig; distinct from retaining_wall, foundation_repair, concrete flatwork, landscaping, irrigation, gutter_cleaning, gutter_guards, basement waterproofing / crawl_space, sump_pump, water_damage, slab_leak, plumber
- [x] Theme niche basement_waterproofing (quote_first) — deep damp basement slate `#0f172a` + waterproof teal `#14b8a6`; sqft/wall-height/crawl-vs-poured-vs-block/interior-vs-exterior/existing drainage/sump/vapor barrier/access/weather assess before firm price; french drain / sump only after assess when relevant; mold-adjacent referral only (NOT mold remediation claims); no bait flat $/lf or $/sqft; no fake same-day dry-out; local permit/HOA educational only (not legal advice); licensed contractor honesty when true; quote before dig/install; distinct from french_drain, retaining_wall, foundation_repair, concrete, water_damage, crawl_space, sump_pump, mold_remediation, gutter_cleaning, gutter_guards, irrigation, landscaping, stump_grinding, plumber, slab_leak
- [x] Theme niche crawl_space_encapsulation (quote_first) — deep crawl olive charcoal `#1c2416` + vapor-barrier lime `#65a30d` (primary changed from old #81 `#292524` which collided with stump_grinding); sqft/height/access/dirt-vs-concrete floor/moisture-standing-water/existing vapor barrier-insulation-vents/HVAC-ducts in crawl/pest-wildlife referral-only (NOT wildlife_removal)/radon educational-only (NOT radon_mitigation install)/rim-joist-sill/sump-dehumidifier/permit-HOA assess before firm price; no bait flat $/sqft; no fake same-day dry crawl; local permit/HOA educational only (not legal advice); licensed contractor honesty when true; quote before encapsulate; distinct from basement_waterproofing, french_drain, retaining_wall, foundation_repair, sump_pump, mold_remediation, water_damage, insulation, radon_mitigation, wildlife_removal, plumber, concrete, landscaping
- [x] Theme niche sump_pump (quote_first) — deep water-slate `#164e63` + bright pump cyan `#22d3ee`; pit/basin size & condition / existing pump age-HP/type (pedestal vs submersible) / backup battery vs water-powered / check valve / discharge line length & freeze risk / alarm / crawl vs basement location / power availability / water table/flood history / float switch/crock/effluent / permit-HOA educational assess before firm price; no bait flat $/pump; no fake never-flood or same-day dry basement; no scare fake 24/7; local permit/HOA educational only (not legal advice); licensed contractor honesty when true; quote before install; mold / full waterproofing / structural foundation referral only; distinct from basement_waterproofing, crawl_space_encapsulation, french_drain, retaining_wall, foundation_repair, water_damage, mold_remediation, plumber, slab_leak, radon_mitigation, wildlife_removal, insulation, concrete, landscaping, gutter_cleaning, gutter_guards
- [x] Theme niche radon_mitigation (quote_first) — deep basement charcoal `#1a1625` + radon amber/gold `#d97706`; home age/foundation type (slab vs basement vs crawl)/existing mitigation system age/fan/piping/manometer/post-mitigation test levels/entry points/soil gas/HVAC interaction/sealed cracks/sump covers/test-first short-long-continuous/suction pit vs crawl membrane fan/discharge height & neighbor setbacks/electrical for fan/permit-HOA educational assess before firm price; no bait flat $/system; no fake pass guaranteed or same-day certify; no scare fake 24/7; EPA/action levels educational only (not medical/legal advice); licensed mitigator honesty when true; quote before install; mold / full waterproofing / wildlife / structural foundation referral only; distinct from crawl_space_encapsulation, basement_waterproofing, sump_pump, french_drain, foundation_repair, insulation, mold_remediation, wildlife_removal, water_damage, plumber, HVAC general, pest_control
- [x] Theme niche wildlife_removal (quote_first) — night-attic slate `#121a2b` + lantern/caution amber `#f59e0b` (primary changed from old #79 `#0f172a` which collided with basement_waterproofing); species ID/entry points/attic-crawl access/exclusion vs live-trap vs one-way door/cleanup-sanitation/seasonal nesting/local permit-rehab educational assess before firm price; quote before trap/exclude; priceFrom 0; no bait flat $/animal; no fake same-day guarantee; no scare fake 24/7; licensed wildlife control honesty when true; structural repair / mold remediation / full waterproofing / radon install / pest_control spray referral only; distinct from pest_control, tree_service, stump_grinding, junk_removal, mold_remediation, water_damage, handyman, crawl_space_encapsulation, radon_mitigation, basement_waterproofing, sump_pump
- [x] Theme niche septic_pumping (quote_first) — earthy tank-slate `#252e2a` + soft algae/moss `#86a373`; tank size/access/last pump date/system type (tank vs aerobic)/distance/after-hours assess before firm price; quote before pump; priceFrom 0; no bait flat $/tank; no scare fake emergency; local septic rules educational only (not legal advice); licensed/permitted when true; distinct from plumber emergencies, slab_leak, water_damage, junk_removal, grease_trap FOG, wildlife_removal, radon_mitigation, sump_pump, crawl_space_encapsulation, basement_waterproofing
- [x] Theme niche grease_trap_cleaning (quote_first) — FOG interceptor slate-ink `#141c26` + muted trap brass `#a68b4b`; trap size/FOG load/indoor vs outdoor/interceptor type/access/pumping frequency/restaurant after-hours assess before firm price; quote before pump; priceFrom 0; no bait flat $/trap; no scare fake emergency; local FOG/wastewater rules educational only (not legal advice); licensed/permitted when true; distinct from kitchen_hood_cleaning, duct_cleaning, pressure_washing, janitorial, septic_pumping, dumpster_rental, porta_potty_rental, plumber, junk_removal
- [x] Theme niche kitchen_hood_cleaning (quote_first) — commercial-kitchen grease charcoal + copper brass primary `#171412` + accent `#b87333`; hood type canopy/island/pizza oven/grease load/stories or roof access/fan & duct path/after-hours schedule assess before firm price; NFPA-96/fire-code educational only (no scare fake emergency); licensed/certified when true; quote before clean; priceFrom 0; no bait flat $/hood or fake same-day clear; distinct from grease_trap_cleaning, dryer_vent_cleaning, duct_cleaning, janitorial, fire_smoke, appliance_repair, hvac, chimney, septic_pumping, pressure_washing, plumber, junk_removal
- [x] Theme niche dryer_vent_cleaning (quote_first) — lint-safe warm slate + hazard-amber primary `#292524` + accent `#f59e0b`; stories/floors/vent length/exterior termination access/roof vs wall/bird nest/lint load/gas vs electric/crawl or attic access/weather assess before firm price; fire-risk / fire-code educational only (no scare fake emergency); licensed when true; quote before clean; priceFrom 0; no bait flat $/vent or fake same-day clear; distinct from kitchen_hood_cleaning, duct_cleaning, chimney, hvac, appliance_repair, grease_trap_cleaning, janitorial, pressure_washing, fire_smoke
- [x] Theme niche duct_cleaning (quote_first) — cool duct-metal slate + soft HVAC teal primary `#334155` + accent `#14b8a6`; home size/system age/supply-return access/contamination load assess before firm price; indoor-air educational only (no medical/mold remediation claims); licensed when true; quote before clean; priceFrom 0; no bait flat per-vent or fake same-day sanitize; distinct from dryer_vent_cleaning, kitchen_hood_cleaning, grease_trap_cleaning, chimney, hvac install/repair, mold_remediation, fire_smoke, appliance_repair, janitorial, pressure_washing
- [x] Theme niche lawn_care (quote_first) — fresh lawn green `#14532d` + soft lime/sun `#a3e635`; lot size/turf condition/access/obstacles/mow frequency (weekly/biweekly) assess before firm price; quote before schedule; priceFrom 0; no bait flat $/visit or $/acre; no overnight makeover / fake same-day; distinct from landscaping, irrigation, snow_removal, tree_service, stump_grinding, pressure_washing, junk_removal, handyman
- [x] Theme niche asphalt_paving (quote_first) — wet-asphalt charcoal `#1c1917` + traffic-amber `#f59e0b` (unique vs sealcoating `#14110f`/`#ea580c`, patio_cover `#1c1917`/`#b45309`); sqft/linear-ft/thickness/existing condition mill-overlay-full-replace + access/equipment/weather/cure/base-prep assess before firm price; quote before mill/overlay/pave; priceFrom 0; no bait flat $/sqft or $/ton; no fake same-day pave; HOA/permit honesty when true; distinct from sealcoating, concrete, epoxy_flooring, pressure_washing, roof_cleaning, lawn_care
- [x] Theme niche line_striping (quote_first) — deep marking charcoal `#0f172a` + safety-yellow `#eab308` (unique vs asphalt_paving `#1c1917`/`#f59e0b`, sealcoating `#14110f`/`#ea580c`); linear-ft/stall/surface paint-vs-thermoplastic/layout/ADA/access/weather/sealcoat-pave wait assess before firm price; quote before stripe; priceFrom 0; no bait flat $/lf or $/stall; no fake same-day striping; HOA/permit/municipal honesty when true; distinct from asphalt paving, sealcoating-only, and concrete flatwork
- [x] Theme niche crack_sealing (quote_first) — near-black crack charcoal `#171717` + bright hot-pour amber `#fbbf24` (unique vs line_striping `#0f172a`/`#eab308`, asphalt_paving `#1c1917`/`#f59e0b`, sealcoating `#14110f`/`#ea580c`); linear-ft/width-depth/surface age/routing-cleaning/hot-pour-vs-cold-pour/weather/access assess before firm price; sealcoat-after as referral/add-on honesty when true; quote before fill; priceFrom 0; no bait flat $/lf; no fake same-day drive-on; distinct from asphalt paving, sealcoating-only, line striping, and concrete flatwork
- [x] Theme niche aircraft_detail (quote_first) — deep hangar navy `#0f172a` + aviation aluminum/sky `#38bdf8` (distinct from auto_detail graphite/chrome and auto_parts `#1f2937`/`#ea580c`); aircraft size/type (GA/turboprop/light jet)/location (hangar/FBO/ramp)/interior-vs-exterior/oxidation-paint/access-badging assess before firm price; detailing only — no maintenance or FAA repair claims; no bait flat package $; no fake same-day; no overnight makeovers; quote before wash or polish
- [x] Theme niche auto_parts (quote_first) — parts-counter charcoal `#1f2937` + signal orange `#ea580c` (distinct from auto_detail graphite/chrome); year/make/model + OEM-vs-aftermarket + fitment/core-return/lead-time assess before firm price; quote before ship; priceFrom 0; no bait flat $/part; no fake in-stock-everywhere; distinct from auto_detail and dealership sales
- [x] Theme niche sealcoating (quote_first) — warm asphalt charcoal `#14110f` + amber/orange road-crew `#ea580c` (unique vs patio_cover `#1c1917`/`#b45309`); sqft/access/cracks/oil stains/weather/cure assess before firm price; sealcoat only — not full paving or concrete resurfacing; quote before coat; priceFrom 0; no bait flat $/sqft or fake same-day drive-on; distinct from pressure_washing, roof_cleaning, epoxy_flooring, lawn_care, concrete, asphalt paving
- [x] Theme niche roof_cleaning (quote_first) — cool wet-roof slate `#1e293b` + soft algae/moss `#65a30d`; stories/access/algae-vs-granule-loss/soft-wash-vs-pressure/weather assess before firm price; soft-wash honesty (pressure can damage granules); quote before wash; priceFrom 0; no bait flat $/sqft or fake same-day; distinct from gutter_cleaning, roofing replacement, pressure_washing, lawn_care, solar, chimney, siding, window_cleaning
- [x] Theme niche snow_removal (quote_first) — deep winter night slate + ice/sky primary `#0c1929` + accent `#38bdf8`; driveway/sidewalk/lot sqft or linear-ft/storm depth/ice melt vs plow vs shovel/access/parking/recurring contract vs one-time storm assess before firm price; equipment honesty; quote before plow; priceFrom 0; no bait flat $/push or fake same-day clear; local ordinance/HOA educational only (not legal advice); distinct from landscaping, pressure_washing, concrete, irrigation, junk_removal, tree_service, handyman
- [x] Theme niche stump_grinding (quote_first) — deep bark charcoal `#292524` + warm stump/mulch amber `#b45309`; stump count/diameter/root flare/access (gate/slope/overhead lines)/buried utilities/grind depth (below grade / flush)/haul-away chips vs leave mulch/species-hardness when true assess before firm price; no bait flat $/stump; no fake same-day; local permit/HOA educational only (not legal advice); distinct from tree_service (call_first storm), landscaping, lawn care, junk removal, concrete, excavation
- [x] Theme niche countertops (quote_first) — cool quartz/stone gray-slate + soft warm veining/brass; sqft/linear/edge/sink-cutout/existing-vs-new/access/stories/material quartz-granite-marble-laminate-butcher-block assess before firm price; no bait flat $/sqft or $/lf; no fake same-day; HOA/permit honesty when true; quote before install
- [x] Theme niche landscaping (quote_first) — outdoor forest green + warm earth; lawn size/access/existing beds/irrigation/season assess before firm price; no bait flat $/visit or $/acre; no fake same-day; seasonal/recurring honesty; quote before mow or install
- [x] Theme niche auto_detail (quote_first) — deep automotive graphite + cool chrome; vehicle size/condition/location/package assess before firm price; interior/exterior honesty; ceramic ≠ wash; no bait flat package fees; no fake same-day; quote before wash or ceramic
- [x] Persist (local JSON) + public site /s/[slug]
- [x] Public site sticky dual CTA (call-first trades / book-first salon; CallRail website tel only; never LSA on page)
- [x] Stub routes: /booking/[slug], /dashboard, /pricing
- [x] Booking stub intake (`POST /api/booking`) + form confirmation + dashboard list
- [x] Dashboard shell polish (snapshot stats, Stripe configured flag without secrets)
- [x] Demo seed (Dallas HVAC from templates)
- [x] README + MASTER_BLUEPRINT + sub-agent protocol
- [x] Production build succeeds (verified this run)
- [x] Theme AI scaffolded
- [x] Theme/action-log JSON store Vercel-safe (`shared/json-store.ts`; live verified 2026-09-04)
- [x] Lead Magnet Engine scaffolded
- [x] Public Free Audit page (`/audit`, `/audit/[slug]`) — ESTIMATE report + demo/pricing CTAs
- [x] Creator audit/Starter copy pack (Ian-approved ESTIMATE honesty + Stripe-dark CTAs)
- [x] Free audit lead-magnet UX polish (dollarize headline, ESTIMATE trust copy, 48px CTAs)
- [x] Audit/pricing regression tests (Vitest: stripe tiers/gates + audit estimate math)
- [x] Call AI dry-run stub (CALL_AI_LIVE=false; HVAC receptionist script pack; no live dials)
- [x] Owner mobile Expo Phase 0 stub (apps/owner-mobile)
- [x] Public /s/[slug] SEO meta (title/description, OG/Twitter, canonical, LocalBusiness JSON-LD)
- [x] App Router robots.ts + sitemap.ts (public Front Door crawl + stable public URLs)
- [x] Front Door security headers (nosniff, Referrer-Policy, X-Frame-Options DENY, Permissions-Policy)
- [x] Stripe Checkout Session API (Starter $49/mo) + Pricing/onboarding CTAs
- [ ] Stripe live in production (Ian: Price IDs + Vercel env + redeploy)

### Demo / live URL
Front Door LIVE: https://apex-hq-five.vercel.app
- [x] Fixed production `/s/[slug]` 500: serverless-safe store (memory/`/tmp` fallback) + always-available `demo-dallas-hvac` (`getDemoBusiness`)

## Protocol
See docs/SUB_AGENT_PROTOCOL.md — single worker for 0.1; no extra sub-agents; money/legal stay with Ian/Eve/Rose.

## Blockers
See shared/blockers.md

## Sales and Outreach Agent (NOT THIS RUN)

Spawn only after Front Door demo is live and tested. Do not scaffold here.

- [ ] Sales agent scaffolded
- [ ] First 20 leads sourced
- [ ] First closed customer

## Legal & Insurance AI (NOT THIS RUN)

Spawn only after Front Door demo is green. Audit agents only — they do not build features.

- [ ] Legal AI scaffolded
- [ ] Insurance AI scaffolded
- [ ] REVIEWS section in use for Module 0.1

See docs/LEGAL_INSURANCE_PROTOCOL.md

## REVIEWS
(none yet — Legal/Insurance AIs not spawned)

## Theme AI Agent

**JOB:** Generate niche visual identity (palette, fonts, copy tone), A/B stub for 7 days, log actions with confidence. Mobile-first + WCAG-minded tokens. No hardcoded business data.

**DATA SOURCE:** Templated niche configs in `src/lib/theme/configs.ts` (HVAC, plumber, salon, trucking). Optional business slug for experiment metadata only.

**OUTPUT:** Theme package JSON via `POST /api/theme/generate`; CSS vars optionally applied on `/s/[slug]`; actions in `data/theme-actions.json` + shared action log.

**BLOCKER CHECK:** Stop and write to BUILD_SPEC / shared/blockers.md on compliance questions; do not impersonate humans or use fake urgency.

- [x] Theme AI scaffolded

See docs/THEME_LEAD_MAGNET_PROTOCOL.md

## Lead Magnet Engine Agent

**JOB:** Qualify public lead fields, generate ESTIMATE-labeled audit reports, CRM list, dry-run outbound only (no live SMS/email spam). Opt-out + business-hours helpers. Fixture source adapter only — no real scraping.

**DATA SOURCE:** Manual/API input + mock fixtures in `src/lib/leads/sources/adapter.ts`. Persist `data/leads.json` / `data/audits.json`.

**OUTPUT:** `POST /api/leads/qualify`, `POST /api/leads/audit`, `GET /api/leads`, outbound dry-run log via `POST /api/leads/outbound`. Shared action log entries.

**BLOCKER CHECK:** Refuse live send without `LEAD_MAGNET_LIVE_SEND=true` + Ian approval comment; stop on CAN-SPAM/TCPA questions and record blocker. No payments, no scraping yet.

- [x] Lead Magnet Engine scaffolded

See docs/THEME_LEAD_MAGNET_PROTOCOL.md

## Theme & Lead Magnet Agents (historical spawn gate)

Front Door is live; scaffolding authorized by Ian for this run.


## Stripe Checkout (Module 0.1)

**JOB:** Let a stranger pay Starter $49/mo after onboarding via Stripe Checkout only.

**STATUS**
- [x] `stripe` package dependency
- [x] `POST /api/stripe/checkout` — subscription mode; body may include `businessSlug` / `email`
- [x] Pricing UI + end-of-onboarding Starter CTA (stranger-safe dark copy when unset; env names stay off public UI)
- [x] `POST /api/stripe/webhook` stub — verifies signature when `STRIPE_WEBHOOK_SECRET` set; logs subscription events; no fake success
- [x] `.env.example` documents Stripe vars
- [ ] Ian creates Price IDs in Stripe Dashboard and sets Vercel env, then redeploys

**Vercel env Ian must set:** `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_STARTER`, `NEXT_PUBLIC_APP_URL` (plus optional `STRIPE_PRICE_GROWTH`, `STRIPE_PRICE_PRO`, `STRIPE_WEBHOOK_SECRET`).

## Lead Scout Agent (NOT THIS RUN)

Spawn only after Front Door is confirmed live AND Stripe checkout works. Never contacts businesses — Ian pitches.

- [ ] Lead Scout scaffolded
- [ ] First daily leads/YYYY-MM-DD.md produced

See docs/LEAD_SCOUT_PROTOCOL.md

## Human-Sounding Outreach Voice Agent (NOT THIS RUN)

Spawn only after Lead Scout has 20 real leads AND free audit page is live.

- [ ] Voice outreach agent scaffolded
- [ ] First 20 calls logged
- [ ] First demo booked with Ian

See docs/VOICE_OUTREACH_PROTOCOL.md

## Paid Diagnostic Offer (NOT THIS RUN)

After free audit curiosity. Requires signed agreement before POS access.

- [ ] Diagnostic offer page / Stripe price
- [ ] Agreement gate before POS connect
- [ ] Aggregate-only analytics path

See docs/PAID_DIAGNOSTIC_OFFER.md

## Discovery & Custom Build Agent (NOT THIS RUN)

Spawn after Paid Diagnostic proven on 3 customers. Ian reviews every spec before build.

- [ ] Discovery agent scaffolded
- [ ] First custom spec delivered to Ian

See docs/DISCOVERY_CUSTOM_BUILD_PROTOCOL.md
