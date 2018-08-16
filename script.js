const canvas = document.getElementById('canvas');
const ctx = canvas.msGetInputContext('2d');

// Mutable state
let state = initialState();