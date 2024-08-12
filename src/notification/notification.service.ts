// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Notifications } from './entities/notification.entity';
// import { Repository } from 'typeorm';
// import * as firebase from 'firebase-admin';
// import * as path from 'path';
// import { NotificationTokenEmployee } from './entities/employee-notification-token.entity';
// import { NotificationDto } from './dto/create-notification.dto';
// import { UpdateNotificationDto } from './dto/update-notification.dto';
//
// firebase.initializeApp({
//   credential: firebase.credential.cert(
//     path.join('./firebase-admin-sdk.json'),
//   ),
// });
//
// @Injectable()
// export class NotificationService {
//   constructor(
//     @InjectRepository(Notifications)
//     private readonly notificationsRepo: Repository<Notifications>,
//   ) {
//   }
//
//   // acceptPushNotification = async (employee: any, notification_dto: NotificationDto) {
//   //   await this.notificationsRepo.update(
//   //     { employee: { id: employee.id } },
//   //     {
//   //       status: 'INACTIVE',
//   //     },
//   //   );
//   //   // save to db
//   //   const notification_token = await this.notificationTokenRepo.save({
//   //     employee: employee,
//   //     device_type: notification_dto.device_type,
//   //     notification_token: notification_dto.notification_token,
//   //     status: 'ACTIVE',
//   //   });
//   //   return notification_token;
//   // };
//   //
//   // disablePushNotification = async (employee: any, update_dto: UpdateNotificationDto): Promise<void> => {
//   //   try {
//   //     await this.notificationTokenRepo.update(
//   //       { employee: { id: employee.id }, device_type: update_dto.device_type },
//   //       {
//   //         status: 'INACTIVE',
//   //       },
//   //     );
//   //   } catch (error) {
//   //     return error;
//   //   }
//   // };
//
//   getNotifications = async (): Promise<any> => {
//     return await this.notificationsRepo.find();
//   };
//
//   sendPush = async (employee: any, title: string, body: string): Promise<void> => {
//     try {
//       const notification = await this.notificationsRepo.findOne({
//         where: { employee: { id: employee.id }},
//       });
//       if (notification) {
//         await this.notificationsRepo.save({
//           notification_token: notification,
//           title,
//           body,
//         });
//         await firebase
//           .messaging()
//           .send({
//             notification: { title, body },
//             token: notification.notification_token,
//             android: { priority: 'high' },
//           })
//           .catch((error: any) => {
//             console.error(error);
//           });
//       }
//     } catch (error) {
//       return error;
//     }
//   };
// }