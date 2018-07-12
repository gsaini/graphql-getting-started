import mongoose from 'mongoose';
import {
    Friends
} from './db-connection';

// resolver map
export const resolvers = {
    Query: {
        getFriend: (root, {
            id
        }) => {
            return new Promise((resolve, reject) => {
                Friends.findById(id, (err, friend) => {
                    if (err) reject(err)
                    else resolve(friend)
                });
            });
        },
    },
    Mutation: {
        createFriend: (root, {
            input
        }) => {
            const {
                firstName,
                lastName,
                gender,
                age,
                language,
                email
            } = input;

            const newFriend = new Friends({
                firstName,
                lastName,
                gender,
                age,
                language,
                email
            });

            newFriend.id = newFriend._id;

            return new Promise((resolve, reject) => {
                newFriend.save((err) => {
                    if (err) reject(err)
                    else resolve(newFriend)
                })
            })
        },
    },
};