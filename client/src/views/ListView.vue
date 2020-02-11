<template>
  <div class="listView">
    <div class="row justify-content-end mr-1 mt-3">
      <div class="col">
        <button class="btn text-danger logout-button" @click="logout">Logout</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1>WIC Tracker</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-check" v-for="list in lists" :key="list._id">
          <input
            v-if="list.checkStatus"
            class="form-check-input"
            type="checkbox"
            value
            id="defaultCheck1"
            @click="toggleCheckStatus(list)"
            checked
          />

          <input
            v-else
            class="form-check-input"
            type="checkbox"
            value
            id="defaultCheck1"
            @click="toggleCheckStatus(list)"
          />

          <!-- <ListItems class="list-group-item" v-for="list in lists" :listProp="list" :key="list._id" /> -->

          <label class="form-check-label" for="defaultCheck1">{{list.listItem}}</label>

          <h5 @click="deleteListItem(list._id)">x</h5>
        </div>
      </div>
    </div>
    <button class="create-button" data-toggle="modal" data-target="#createItemModal">Add Item</button>
    <button class="reset-button" @click="resetList">Reset</button>
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
    resetList() {},
    toggleCheckStatus(list) {
      if (list.checkStatus == true) {
        list.checkStatus = false;
      } else list.checkStatus = true;
      this.$store.dispatch("toggleCheckStatus", list);
    },
    logout() {
      this.$store.dispatch("logout");
    },
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
