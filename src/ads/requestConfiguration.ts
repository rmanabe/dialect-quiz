import type { MaxAdContentRating } from 'react-native-google-mobile-ads';

/**
 * How ads are requested. Pulled out of initAds so it can be tested without the
 * native module, and so the reasoning below has somewhere to live.
 *
 * The app used to declare itself child-directed: `tagForChildDirectedTreatment`
 * and `tagForUnderAgeOfConsent` on, ad content capped at G. That followed the
 * Play target-audience declaration, which had every age band checked including
 * under-13 — and under-13 is what puts an app under the Families Policy.
 *
 * The declaration was wrong. Who the app is *designed for* is not who may play
 * it: anyone can already install it, because the content rating is 3+/4+. The
 * under-13 bands bought regulatory obligations (a neutral age screen the app
 * does not have, and could not add without risking Apple Guideline 5.1.1(v) for
 * collecting data the quiz does not need) while widening the audience by nobody.
 *
 * With those flags on, personalized ads are off and the rate drops. Turning
 * them off is only correct once the store declaration says the same thing —
 * shipping this while Play still declares under-13 would mean serving
 * personalized ads to a declared child-directed app, which is the violation
 * rather than the fix. See the ordering note in the commit message.
 *
 * PG rather than T: the listing stays rated for everyone, so ad content should
 * stay something a 3-year-old's parent would not complain about. PG is the
 * step up from G that keeps that true.
 */
export function adRequestConfiguration(ratings?: typeof MaxAdContentRating) {
  return {
    // The enum member is just the string "PG" at runtime. Reading it through
    // the SDK keeps the type honest; the fallback keeps a version of the SDK
    // that dropped the enum from turning ad setup into `undefined.PG`.
    maxAdContentRating: ratings?.PG ?? ('PG' as (typeof MaxAdContentRating)['PG']),
    tagForChildDirectedTreatment: false,
    tagForUnderAgeOfConsent: false,
  };
}
