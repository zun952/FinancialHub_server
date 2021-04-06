import express from 'express';
import expressLoader from "./express";

export default ({ expressApp }: { expressApp: express.Application }) => {
    expressLoader({ app: expressApp });
}