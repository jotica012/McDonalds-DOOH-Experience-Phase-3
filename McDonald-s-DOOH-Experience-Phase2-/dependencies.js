import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import os from 'os';
import {SerialPort, ReadlineParser} from 'serialport'
import dotenv from "dotenv"
import fs from  "fs"
export {express, Server, cors, os, SerialPort, ReadlineParser, dotenv, fs};