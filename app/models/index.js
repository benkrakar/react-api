import mongoose from 'mongoose';
import usersShema from './users-model.js';
import productsShema from './rooms-model.js';
import categoriesShema from './hotels-model.js';
import reviewssShema from './reservations-model.js';

const models = {};
models.products = mongoose.model('Products', productsShema);
models.users = mongoose.model('Users', usersShema);
models.categories = mongoose.model('Categories', categoriesShema);
models.reviews = mongoose.model('Reviews', reviewssShema);

export default models;
