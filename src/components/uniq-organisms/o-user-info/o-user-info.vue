<template>
    <Fieldset>
        <template #legend>
            <div class="flex items-center pl-2">
                <Avatar :label="firstLetter" shape="circle" />
                <span class="font-bold p-2">{{ user.signInDetails.loginId }}</span>
            </div>
        </template>
        <p class="m-0">{{ user }}</p>
        <p class="m-0">{{ status }}</p>
        <p class="m-0">{{ data }}</p>

        <Knob v-model="age" />

        <div class="flex gap-4 mt-1">
            <Button
                label="Sign Out"
                severity="danger"
                outlined
                class="w-full"
                @click="signOutHandler"
            />
            <Button
                label="Save"
                class="w-full"
                @click="updateHandler"
            />
        </div>
    </Fieldset>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Fieldset from 'primevue/fieldset';
import Knob from 'primevue/knob';

import { getUser, updateUserAge } from '~/services/graphql-service';

import {
    ref,
    computed
} from 'vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});
const emit = defineEmits({
    signOut: null
})

const { data, status, refresh } = await useAsyncData(() => getUser(props.user.username));

const age = ref(data.value?.age || 0);

const { execute: updateExecute } = await useAsyncData(() => updateUserAge(props.user.username, age.value), { immediate: false });

const firstLetter = computed(() => props.user.username.at(0));

function signOutHandler() {
    emit('signOut');
}

async function updateHandler() {
    await updateExecute();
    refresh();
}
</script>