# Updates

Dated, factual updates, newest first. Each one says what changed, how we know, and what remains open. Corrections are
made in place and marked as corrections.

## 2026-11-11: A planned link with gno.land

- **What changed:** Arobi started work on a link with gno.land, the smart-contract platform written in Gno: paying for
  Arobi services such as Whisper with GNOT, and anchoring Arobi evidence on gno.land. The design keeps value on each
  network and moves only proof between them: no bridge, no wrapped coin. It is listed as **Planned** in
  [PRODUCTS.md](PRODUCTS.md).
- **How we know:** the design is written down. No part of it has been released, so there is nothing to check yet.
- **What remains open:** the work that turns the plan into a product: the gno.land contracts, a payment check that
  does not depend on trusting any single server, Whisper accepting the payment, and an independent review of all of it
  before it handles real GNOT. Each step will be reported here when it is done.

## 2026-11-11: Finished pictures only

- **What changed:** the artwork in [assets/](assets/) is now published as finished pictures, each carrying inside the
  file the text that says whose it is. The drawings they are made from are no longer published here.
- **How we know:** `node scripts/check-assets.mjs` checks every picture and fails on a published drawing.
- **What remains open:** nothing for this change.

## 2026-11-09: This repository opens

- **What changed:** Arobi Technology Alliance opened this public repository to tell the mission and the work in public,
  at a high level, as it unfolds. It carries the mission, the builder story, an honest product list, and new campaign art
  in the Arobi element-chart style: the three pillars as elements Si, Ab and Su, standing on Trust + Assurance.
- **How we know:** this commit.
- **What remains open:** issues and contributions stay closed until contribution terms are published.

## Important

This repository is information about Arobi. It is not an offer to sell, or a solicitation of an offer to buy, any
security, and it does not accept money, investments, reservations or commitments of any kind. See [LEGAL.md](LEGAL.md).
