<template>
  <v-container class="fill-height">
    <v-main>
      <v-row align="center" justify="center" no-gutters >
        <v-col cols="12" sm="8" md="8" lg="8" xl="8">
          <v-container>
            <h2 class="deep-orange--text
        font-weight-bold
        text-h4
        text-md-h2
        text-lg-h2
        text-xl-h2">
              Database
            </h2>
          </v-container>
          <v-card align="center" flat class="rounded-xl elevation-24">
            <v-window>
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" sm="8" md="8" lg="8" xl="8" class="pt-6 pb-6">
                    <v-card-text>
                      <v-form>
                        <v-text-field
                            v-model="name"
                            label="Логин"
                            id="login"
                            color="teal"
                            append-icon="person"
                            rounded
                            :rules="inputRules"
                            required
                            outlined>
                        </v-text-field>
                        <v-text-field
                            v-model="password"
                            append-icon="lock"
                            color="teal"
                            label="Пароль"
                            type="password"
                            id="login"
                            rounded
                            @keyup.enter='auth()'
                            :rules="inputRules"
                            required
                            outlined>
                        </v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-alert :value="!!error" type="error">
                      {{error}}
                    </v-alert>
                    <v-btn :disabled='inProcess' @click='auth()' class="mb-5 white--text font-weight-bold" color="teal" rounded elevation="0" width="150px">
                      Войти
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="teal rounded-tr-xl rounded-br-xl white--text" justify="center">
                    <img src="@/assets/pictures/001-teacher.png" height="80px" alt/>
                    <p class="
                text-sm-body-2
                text-md-body-1
                text-lg-body-1
                text-xl-body-1">
                      - удаление <br>
                      - добавление <br>
                      - изменение
                    </p>
                    <img src="@/assets/pictures/002-student.png" height="80px" alt/>
                    <p class="text-sm-body-2
                text-md-body-1
                text-lg-body-1
                text-xl-body-1">
                      - поиск
                    </p>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import {logIn, getUser} from '@/services/auth'
// import { defineRulesFor } from "@/services/ability";
export default {
  name: 'FormValidation',
  props: {
    source: String,
  },
  data() {
    return {
      name: '',
      password: '',
      inProcess: false,
      error: null,
      inputRules: [
        v => !!v || 'Заполните поле'
      ]
    }
  },
  methods : {
    logIn,
    getUser,
    async auth(){
      if (this.inProcess) {
        console.warn('logIn() dulp');
        return false;
      }

      this.error = null;
      this.inProcess = true;

      try {
        await this.logIn(this.name, this.password);
        // this.$ability.update(defineRulesFor(this.getUser()));
        await this.$router.replace('/students/get');
      } catch (err) {
        this.error = err;
      } finally {
        this.inProcess = false;
      }

      return false;
    }
  }
};
</script>