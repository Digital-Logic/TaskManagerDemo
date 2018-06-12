<template>
    <v-card 
        raised
        :class="{ 'pa-1': $vuetify.breakpoint.xsOnly,
                    'pa-2': $vuetify.breakpoint.smAndUp }"
        class="mb-4">
        <slot />
    </v-card>
</template>