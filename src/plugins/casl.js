import Vue from 'vue';
import { abilitiesPlugin } from '@casl/vue';
import { defineAbilitiesFor } from '@/services/ability';
import { getUser } from '@/services/auth';

Vue.use(abilitiesPlugin, defineAbilitiesFor(getUser()));
