<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">事項</h1>
      </v-col>

        <!-- v-model="newItem" 功能? -->
        <!-- label說明 -->
        <!-- 內建驗證功能，給他function，在使用者輸入後執行，只是顯示給使用者，後台還要另外驗證 :rules="[rules.required,rules.length]" -->
        <!-- ref="newItemInput" 給元件一個id 讓元件做事-->
        <v-col cols="12">
          <v-text-field 
          variant="solo-filled" 
          label="新增事項"
          v-model="newItem"
          :rules="[rules.required,rules.length]"
          append-icon="mdi-plus"
          ref="newItemInput"
          @click:append="onInputSubmit"
          @keydown.enter="onInputSubmit"
          ></v-text-field>


        <v-table>
          <thead>
            <tr>
              <th>名稱</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item,i) in items" :key="item.id">
              <td>
                <span v-show="!item.edit">{{ item.name }}</span>

                <v-text-field
                v-show="item.edit"
                v-model="item.model"
                :rules="[rules.required,rules.length]"
                ref="editItemInput" 
                @keydown.enter="onEditInputSubmit(item.id,i)"
                autofocus
                >
                </v-text-field>
              </td>
            
              <td>
                <template v-if="!item.edit">
                <v-btn icon="mdi-pencil" variant="text" color="green" @click="editItem(item.id)"></v-btn>
                <v-btn icon="mdi-delete" variant="text" color="red" @click="delItem(item.id)"></v-btn>
                </template>  
                <template v-else>
                    <v-btn icon="mdi-check" variant="text" color="green" @click="onEditInputSubmit(item.id,i)"></v-btn>
                    <v-btn icon="mdi-undo" variant="text" color="red"  @click="cancelEditItem(item.id)"></v-btn>
                </template>
              </td>
            </tr>

            <tr  v-if="items.length ===0">
                <td colspan="2">沒有事項</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from 'vue'
import {useListStore} from '@/store/List'
import { storeToRefs } from 'pinia';

const list = useListStore()
const {items}=storeToRefs(list)
const {addItem,editItem,delItem,cancelEditItem,confirmEditItem} = list

const newItem = ref('')
// newItemInput 要跟上面同名，然後 ref() 這裡面打預設的值
const newItemInput = ref(null)
const editItemInput =ref([])

const onInputSubmit = async()=>{
  // validate() reset() 是 v-text-field 元件裡面的Function
  // validate()  執行表單驗證的一個函數
  const validate = await newItemInput.value.validate()
  console.log(validate)
  if(validate.length>0) return
  addItem(newItem.value)
  newItemInput.value.reset()
}

const onEditInputSubmit = async(id,i)=>{
  const validate = await editItemInput.value[i].validate()
  if(validate.length>0) return
  confirmEditItem(id)
}

const rules={
  required:(value)=>{
    return Boolean(value) || '欄位必填'
  },
  length:(value)=>{
    return value.length >=3 || '必須三個字以上'
  }

}

</script>
