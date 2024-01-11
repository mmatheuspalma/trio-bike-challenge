<template>
  <vue-date-picker
    v-model="date"
    :range="true"
    :inline="true"
    :enable-time-picker="false"
    :min-date="new Date()"
    :disabled-dates="disabledDates"
    :no-disabled-range="true"
    :auto-apply="true"
    :highlight="highlightDates"
    :month-change-on-scroll="false"
    month-name-format="long"
    calendar-class-name="calendar"
    menu-class-name="calendar__menu"
    calendar-cell-class-name="calendar__cell"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  name: 'BookingCalendar',
  components: { VueDatePicker },
  props: {
    highlightDates: {
      default: () => [new Date()],
      type: Array as PropType<Date[] | string[]>,
      required: false
    },
    disabledDates: {
      type: Object as PropType<Date[] | string[] | ((date: Date) => boolean)>,
      required: true
    }
  },
  emits: ['changed'],
  data() {
    return {
      date: null
    }
  },
  watch: {
    date: {
      handler(value) {
        this.$emit('changed', value)
      }
    }
  }
})
</script>

<style lang="scss">
:root {
  --dp-cell-size: 45px;
  --dp-menu-padding: 12px 18px;
}

.dp__outer_menu_wrap {
  width: 100%;
}

.dp__main {
  width: calc(100% + 50px);
  margin-left: -25px;
}

.dp__instance_calendar {
  .dp__month_year_row {
    height: auto;
    margin-bottom: 20px;

    .dp__btn {
      order: 1;

      &:last-child {
        order: 2;
      }
    }

    .dp__inner_nav {
      color: #fff;
      height: 55px;
      width: 55px;
      background-color: transparent;
      border-radius: 20px;
      padding: 0px;
      border: 1px solid #869bdf;

      &:hover {
        border-color: #fff;
      }
    }

    .dp__month_year_wrap {
      order: 0;
      flex-direction: column;

      .dp__month_year_select {
        color: #8fa4e8;
        text-align: left;
        width: auto;
        display: block;
        pointer-events: none;

        &:first-child {
          color: #fff;
          font-weight: bold;
          font-size: 2rem;
        }
      }
    }
  }
}

.calendar {
  .dp__calendar_header {
    color: #8fa4e8;
  }

  .dp__calendar_header_separator {
    display: none;
  }

  .dp__calendar_item {
    color: #fff;
    display: flex;
    justify-content: center;

    &.dp__cell_disabled {
      color: #8fa4e8;
    }

    &:has(.dp__range_between) {
      background-color: #5071db;
    }

    &:has(.dp__range_start) {
      justify-content: flex-start;
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      background-color: #5071db;
    }

    &:has(.dp__range_end) {
      justify-content: flex-end;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      background-color: #5071db;
    }
  }
}

.calendar__cell {
  border-radius: 50%;

  &.dp__cell_highlight {
    color: #fff;
    border-color: #fff;
  }

  &.dp__range_between {
    border-radius: 0px;
    color: #fff;
    border: none;
    background-color: #5071db;
  }

  &.dp__range_start,
  &.dp__range_end {
    color: get-theme-color('primary');
    background-color: #fff;
  }
}

.calendar__menu {
  border-radius: 25px;
  background-color: get-theme-color('primary');
}
</style>
