import { Request, Response } from 'express';

export const twitter = (req: Request, res: Response) => {
  const io = req.app.get('io');
  // const user = {
  //   name: req.user!.username,
  //   photo: req.user!.photo,
  //   // photo: req.user!.photos[0].value.replace(/_normal/, ''),
  // };
  io.in(req.session!.socketId).emit('auth', req.user);
  res.end();
};

export const google = (req: Request, res: Response) => {
  const io = req.app.get('io');
  // const user = {
  //   name: req.user!.username,
  //   photo: req.user!.photo,
  //   //photo: req.user!.photos[0].value.replace(/sz=50/gi, 'sz=250'),
  // };
  console.log('Google req: ', req.user);
  io.in(req.session!.socketId).emit('auth', req.user);
  res.end();
};

export const github = (req: Request, res: Response) => {
  const io = req.app.get('io');
  // const user = {
  //   name: req.user!.username,
  //   photo: req.user!.photo,
  // };
  io.in(req.session!.socketId).emit('auth', req.user);
  res.end();
};
