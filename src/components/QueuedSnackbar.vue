<template>
    <v-snackbar 
        v-model="visible"
        :timeout="messageDuration">
        <span v-html="message"/>
        <v-btn @click="btnAction" flat color="error">{{ btnMessage }}</v-btn>
    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {            
            message: "",
            btnMessage: "",
            action: null,                    
            visible: false
        };
    },
    computed: {
        ...mapState({
            messageQueue: "messageQueue",
            messageDuration: (state) => state.settings.messageDuration
        }),
        hasPending() {
            return this.undoList.length > 0;
        }
    },
    methods: {
        displayMessage(item) {            
            this.message = item.message;
            this.btnMessage = item.btnMessage;
            this.action = item.action;
            this.visible = true;
            
            // Remove message from queue
            item.shiftMessageQueue();
        },
        btnAction() {
            if (typeof this.action === 'function')
                this.action();
            this.visible = false;
        }
    },
    watch: {
        messageQueue(queue) {
            if (!this.visible && queue.length > 0) {
                // display message
                this.displayMessage(queue[0]);               
            }
        },
        visible(isVisible) {
            // display next message, if one exist
            if (!isVisible && this.messageQueue.length > 0) {
                this.$nextTick(() => this.displayMessage(this.messageQueue[0]) );
            }
        }
    }
}
</script>