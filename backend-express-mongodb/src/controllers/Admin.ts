import {Response, Request} from "express";
import * as mongoose from "mongoose";
import Twitter from "../models/Twitter";

export const getTweets = (req: Request, res: Response): void => {
    Twitter.find((err, data) => {
        console.log(data)
        res.json(data);
        if(err) {
            console.log("ERROR: ", err)
        }
    });
};

export const getTweet = async (req: Request, res: Response): Promise<any> => {
    const tweetId = req.params.tweetId;
    console.log("Tweet ID", tweetId)
    if(!mongoose.Types.ObjectId.isValid(tweetId)) return false

    await Twitter.findById(tweetId).exec()
    Twitter.findById(tweetId, (err: any, tweet: any) => {
        console.log(tweet)
        res.json(tweet)
        if(err) {
            console.log("ERROR: ", err)
        }
    });
};

export const postTweet = (req: Request, res: Response) => {
    const {tweet, img} = req.body
    const twitter = new Twitter({tweet: tweet, img: img});

    twitter.save().then(() => {
        console.log("Tweet Created");
        res.status(201).json({msg: "Tweet Created"})
    });
};

export const updateTweet = (req: Request, res: Response) => {
    const tweetId = req.params.tweetId;
    const {tweet, img} = req.body

    Twitter.findByIdAndUpdate(tweetId, {tweet: tweet, img: img}).then(() => {
        console.log(`Tweet ${tweetId} Updated`)
        res.json({msg: `Tweet ${tweetId} Updated`})
    });
};

export const deleteTweet = (req: Request, res: Response) => {
    const tweetId = req.params.tweetId;
    Twitter.findByIdAndRemove(tweetId, () => {
        res.json({msg: `Tweet ${tweetId} Deleted`})
    })
}