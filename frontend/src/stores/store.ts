import { writable } from "svelte/store";

export const stackPhases = {
    'stopped': 0,
    'move': 1,
    'stabilize': 2,
    'expose': 3,
}

export const stackPhaseNames = {
    0: 'stopped',
    1: 'move',
    2: 'stabilize',
    3: 'expose',
}

export const defaultSettings = {

    // Position & movement
    position: 0,
    target: 0,
    step_values: [10, 1, 0.1, 0.01],
    
    // Stack settings
    stack_count: 0,
    stabilize_ms: 500,
    stack_end: -5,
    expose_ms: 500,
    shot_counter: 0,
    step_distance: 1,
    stack_shots: 4,
    flash_recycle: 0,
    delay_stabilize: 0.5,
    delay_exposure: 1,
    stack_return: true,

    // Stack settings (no widgets)
    stack_paused: false,
    stack_phase: stackPhases.stopped,

    // Motion & general settings
    microstepping: 8,
    screw_lead: 2,
    steps_per_turn: 200,
    max_speed: 10,
    acceleration: 40,
    invert: false,
    unpower_idle: true,
}
export type Store = typeof defaultSettings

const savedSettings = localStorage.getItem('settings')

const store = writable(savedSettings ? JSON.parse(savedSettings) : defaultSettings)

// Set a callback on store value change
// so that the localstorage is updated
store.subscribe(data => {
    // console.log('value:', data)
    localStorage.setItem('settings', JSON.stringify(data));
});

// export function resetDefaults() {
//     store = { ...store, ...defaultSettings }
// }

export default store