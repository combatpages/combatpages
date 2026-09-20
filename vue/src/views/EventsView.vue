<template>
  <PageSection title="Events" code="events">
    <!-- Search bar and faceted search before showing anything... -->
     <!-- Show map with geolocation -->
    <div id="events-home">
       <p>For upcoming events, please check the Combat Pages Instagram account!</p>
       <p>For more information about combat sport events in Australia more broadly, please look below.</p>
      <ul>
        <li>Muay Thai:</li>
        <ul>
          <li><a href="https://www.muaythainsw.com.au/">Muaythai Australia - NSW</a></li>
          <li><a href="https://ausmuaythai.com.au/">Aus Muay Thai (Online Event Listing)</a></li>
          <li><a href="https://1774muaythai.com/">1774 Muay Thai Series (Sydney)</a></li>
          <li><a href="https://www.instagram.com/road2siam_promotions/">Road2Siam Promotions (Sydney)</a></li>
          <li><a href="https://www.instagram.com/srgpromotions">SRG Promotions (Sydney)</a></li>
          <li><a href="https://www.siam2sydney.com/">Siam2Sydney (Sydney)</a></li>
          <li><a href="https://www.instagram.com/cabrapromotions/">Cabra Promotions (Sydney)</a></li>
        </ul>
        <li>Jiu Jitsu (BJJ)/Submission grappling:</li>
        <ul>
          <li><a href="https://www.grapplemania.com/">Grapple Mania (Sydney)</a></li>
          <li><a href="https://www.subversion.live/links">Subversion (Sydney)</a></li>
          <li><a href="https://www.instagram.com/arcanegrappling/">Arcane Grappling (Sydney)</a></li>
          <li><a href="https://grapplingindustries.com/">Grappling Industries (World-wide)</a></li>
          <li><a href="https://apexsubmissionleague.com/">Apex Submission League (Central Coast)</a></li>
        </ul>
        <li>Mixed Martial Arts (MMA):</li>
        <ul>
          <li><a href="https://eternalmma.com/">Eternal MMA (Australia,New Zealand)</a></li>
          <li><a href="https://www.endourofightseries.com.au/">Enduro Fight Series (Canberra)</a></li>
          <li><a href="https://hexfightseries.com/">Hex Fight Series (Melbourne)</a></li>
          <li><a href="https://vitalkombat.com/">Vital Kombat (Central Coast)</a></li>
        </ul>
        <li>Judo:</li>
        <ul>
          <li><a href="https://www.judonsw.com.au/">Judo NSW</a></li>
          <li><a href="https://www.judonsw.com.au/events">Judo NSW Events</a></li>
          <li>
              <a href="https://findjudo.au/">FindJudo</a>
              <ul>
                <li>This is a website similar to Combat Pages but focused on finding judo clubs and providing a judo events calendar.</li>
              </ul>
          </li>
        </ul>
        <li>Various disciplines:</li>
        <ul>
          <li><a href="https://www.gloryau.com.au/">Glory Australia Promotions (Sydney)</a></li>
          <li><a href="https://www.instagram.com/samurai_fightseries">Samurai Fight Series (Sydney)</a></li>
          <li><a href="https://www.inflictionfightseries.com.au/">Infliction Fight Series (Various Locations)</a></li>
          <li><a href="https://fusionfightingchampionship.com.au/">Fusion Fighting Championship (Various Locations)</a></li>
        </ul>
      </ul>
    </div>
  </PageSection>
</template>

<script>
import PageSection from '../components/PageSection.vue';
export default {
  components: {
    PageSection
  },
  name: 'EventsView',
};
</script>

<style scoped>
/* Add any specific styles for the EventsView here */
</style>