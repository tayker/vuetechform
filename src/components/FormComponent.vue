<template>
    <div>
        <h1>Form</h1>
        <form class="form" @submit.prevent="onSubmit()">
            <div class="top-bar">
                <div class="label">
                    Properties
                </div>
                <div class="label label--secondary">
                    Order
                </div>
            </div>
            <div class="form-content">
                <div 
                    class="element"
                    v-for="(element, index) in formElements" 
                    :key="index"
                >
                    <div class="element-content">
                        <div class="number">
                            {{ element.priority }}.
                        </div>
                        <select 
                            v-model="element.selected"
                            required
                        >
                            <option value="" disabled hidden selected>
                                Choose a option
                            </option>
                            <option 
                                v-for="(label, optionIndex) in formData" 
                                :key="optionIndex"
                                :value="label.name"
                                :disabled="matchSelected(label.name)"
                                
                            >
                                {{ label.title }}
                            </option>
                        </select>
                        <button 
                            type="button"
                            class="button button--sort"
                            @click="element.sort = changeSort(element.sort)"
                        >
                            <img
                                :src="element.sort === 'ASC' ?
                                getImgUrl('sort-ASC.svg') :
                                getImgUrl('sort-DESC.svg')"
                                alt=""
                            >
                        </button>
                    </div>
                    <button 
                        type="button"
                        class="button button--delete"
                        @click="deleteLabel(index)"
                    >
                        <img src="../assets/clear.svg" alt="">
                    </button>
                </div>
                <button 
                    type="button"
                    class="button button--create"
                    @click="createLabel()"
                >
                    <img src="../assets/plus.svg" alt="">
                    Add property
                </button>
                <button 
                    type="submit"
                    class="button button--submit"
                >
                    Submit
                </button>
            </div>
        </form>
        <pre>
            {{ formElements }}
        </pre>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'FormComponent', 
    data() {
        return {
            formElements: [
                
            ]
        }
    },
    computed: {
        ...mapGetters(['formData'])
    },
    methods: {
        ...mapActions(['fetchData', 'onSendData']),
        getImgUrl(url) {
            return require(`../assets/${url}`);
        },
        changeSort(sort) {
            if(sort === 'ASC') return 'DESC';
            else return 'ASC';
        },
        createLabel() {
            this.formElements.push({
                selected: '',
                sort: 'ASC',
                priority: this.formElements.length === 0 ? 1 : this.formElements[this.formElements.length - 1].priority + 1
            })
        },
        deleteLabel(idx) {
            this.formElements.splice(idx, 1);

            for(let i = idx; i < this.formElements.length; i++ ) {
                this.formElements[i].priority--;
            }
        },
        matchSelected(labelName) {
            return this.formElements.filter(function(el) {
                return  el.selected == labelName;
            }).length > 0;
        },
        onSubmit() {
            this.onSendData(this.formElements);
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<style scoped lang="scss">
    .form {
        max-width: 400px;
        margin: 0 auto;

        &-content {
            display: flex;
            flex-direction: column;

        }
    }
    .top-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .label {
            font-weight: bold;
            &--secondary {
                padding-right: 30px;
            }
        }
    }
    .element {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        &-content {
            display: flex;
            justify-content: space-between;
            width: 100%;
            background: #eeecec;
            padding: 10px;
        }
    }
    .button {
        cursor: pointer;
        background: none;
        border: none;
        &--delete, &--sort, &--create {
            img{
                width: 16px;
                height: 16px;
            }
        }
        &--create {
            display: flex; 
            align-items: center;
            color: #43B05C;
            font-weight: bold;
            padding: 5px 10px;
            border: 2px solid #43B05C;
            align-self: flex-start;
            img {
                margin-right: 10px;
            }
        }
        &--submit {
            background: darkblue;
            color: #fff;
            text-transform: uppercase;
            font-size: 20px;
            padding: 10px;
            margin-top: 20px;
            align-self: center;
        }
    }
    select {
        width: 100%;
        margin: 0 10px;
        cursor: pointer;
    }
</style>
