<template>
  <div id="createItemModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">add a main course</h5>
          <button class="logout-button" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="title">List Item:</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="add an item"
                v-model="newListItem"
                required
              />
            </div>
            <button class="register-button" data-dismiss="modal" @click="addListItem()">submit</button>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "createItemModal",
  data() {
    return {};
  },
  computed: {},
  methods: {
    addListItem() {
      let payload = {
        listItem: this.newListItem,
        checkStatus: false
      };
    }
  },
  components: {}
};
</script>


<style scoped>
</style>