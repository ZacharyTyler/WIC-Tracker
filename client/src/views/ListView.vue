<template>
  <div class="listView">
    <h1>WIC Tracker</h1>
    <form>
      <div class="form-check" v-for="list in lists" :key="list._id">
        <input class="form-check-input" type="checkbox" value id="defaultCheck1" />

        <!-- <ListItems class="list-group-item" v-for="list in lists" :listProp="list" :key="list._id" /> -->

        <label class="form-check-label" for="defaultCheck1">{{list.listItem}}</label>

        <h5 @click="deleteListItem(list._id)">x</h5>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
    <button class="create-button" data-toggle="modal" data-target="#createItemModal">Add Item</button>
    <createItemModal />
  </div>
</template>


<script>
import createItemModal from "../components/CreateItemModal";
export default {
  name: "listView",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllListItems");
    // this.$store.dispatch("getListItemsById");
  },
  computed: {
    lists() {
      return this.$store.state.list;
    }
  },
  methods: {
    deleteListItem(listId) {
      this.$store.dispatch("deleteListItem", listId);
    }
  },
  components: {
    createItemModal
  }
};
</script>


<style scoped>
</style>
