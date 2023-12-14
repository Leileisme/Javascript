<template>
  <v-container>
    <v-row>
      <v-col cols="12" >
        <h1 class="text-center">鈴聲設定</h1>
      </v-col>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <td>名稱</td>
              <td>視聽</td>
              <td>選擇</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alarm in alarms" :key="alarm.id">
              <td>{{ alarm.name }}</td>
              <td> <audio :src="alarm.file" controls></audio> </td>
              <td>
                <v-radio-group v-model="selectedAlarm">
                  <v-radio :value="alarm.id"></v-radio>
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useSettingsStore } from '@/store/settings';
import { storeToRefs } from 'pinia';

const settings = useSettingsStore()
const {alarms,selectedAlarm} = storeToRefs(settings)

</script>
