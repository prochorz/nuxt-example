<template>
  <div>
    <Authenticator>
      <template v-slot="{ user, signOut }">
        <OUserInfo
          :user="user"
          @signOut="signOut"
        />
      </template>
    </Authenticator>
  </div>
</template>

<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";

import OUserInfo from "./src/components/uniq-organisms/o-user-info";

const { $auth } = useNuxtApp()
</script>

<style type="css" src="@aws-amplify/ui-vue/styles.css" />
