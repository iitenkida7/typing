<template>
  <div class="columns">
    <div class="column" v-for="photo in photos[word]" :key="photo.item">
      <img :src="photo.url_s" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Images",
  props: ["word", "imageData"],
  data: function () {
    return {
      photos: [],
    };
  },
  mounted: function () {
    this.imageData.forEach((value, index) => {
      this.getImage(value.word);
    });
  },
  methods: {
    getImage(text) {
      const flickrApiEndpoint =
        "https://api.flickr.com//services/rest/?" +
        new URLSearchParams({
          method: "flickr.photos.search",
          api_key: "2da67eccedeb0b110a63374c5c53cc41",
          per_page: 10,
          extras: "url_s",
          sort: "relevance",
          media: "photos",
          safe_search: 1,
          format: "json",
          nojsoncallback: 1,
          text: text,
        }).toString();
      axios
        .get(flickrApiEndpoint)
        .then((response) => (this.photos[text] = response.data.photos.photo));
    },
  },
};
</script>
