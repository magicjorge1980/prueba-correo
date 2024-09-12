import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    card: {
        type: String,
        required: true,
    },
});

const Card = mongoose.model('Card', cardSchema);
export default Card;
