const app = require('./index');  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`SERVER ON on port ${PORT}`);
});
