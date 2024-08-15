import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Static, Type } from './statics/entities/static.entity';
import { Repository } from 'typeorm';
import { SubCategory } from './sub-categories/entities/sub-category.entity';
import { SuperAdmin } from './super-admin/entities/super-admin.entity';
import * as firebase from 'firebase-admin';

// firebase.initializeApp({
//   credential: firebase.credential.cert(
//     './firebase-admin-sdk.json'
//   ),
// });

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Static) private staticRepository: Repository<Static>,
    @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(SuperAdmin) private superAdminRepository: Repository<SuperAdmin>,
  ) {
  }


  getHello(): string {
    return 'Hello World!';
  }

  async seed() {


    //if you want to clear the tables before seeding, uncomment

    // const subcategories = await this.subCategoryRepository.find();
    // for (const subcategory of subcategories) {
    //   await this.subCategoryRepository.remove(subcategory);
    // }
    // const statics = await this.staticRepository.find();
    // for (const staticEntity of statics) {
    //   await this.staticRepository.remove(staticEntity);
    // }
    //
    // const superAdmin = await this.superAdminRepository.findOne({ where: { email: 'superAdmin@gmail.com' } });
    // if(superAdmin)
    // await this.superAdminRepository.remove(superAdmin);

    try {
    {//Statics


      {//Jop Types
        await this.staticRepository.save({
          name: 'Full Time',
          type: Type.Job_type,
        });
        await this.staticRepository.save({
          name: 'Part Time',
          type: Type.Job_type,
        });
        await this.staticRepository.save({
          name: 'Freelance',
          type: Type.Job_type,
        });
        await this.staticRepository.save({
          name: 'Work From Home',
          type: Type.Job_type,
        });
      }

      {//Levels
        await this.staticRepository.save({
          name: 'Junior',
          type: Type.Level,
        });
        await this.staticRepository.save({
          name: 'Senior',
          type: Type.Level,
        });
        await this.staticRepository.save({
          name: 'Student',
          type: Type.Level,
        });
      }


      {//Categories
        await this.staticRepository.save({
          name: 'ITE',
          type: Type.Category,
        });
        await this.staticRepository.save({
          name: 'Banking',
          type: Type.Category,
        });
        await this.staticRepository.save({
          name: 'Graphic Design',
          type: Type.Category,
        });
        await this.staticRepository.save({
          name: 'Education',
          type: Type.Category,
        });
      }
    }

    {//subcategories
      const ITE = await this.staticRepository.findOne({ where: { name: 'ITE' } });


      await this.subCategoryRepository.save({
        name: 'Java',
        category: ITE,
      });
      await this.subCategoryRepository.save({
        name: 'Laravel',
        category: ITE,
      });

      await this.subCategoryRepository.save({
        name: 'nestJs',
        category: ITE,
      });


    }


    {//super admin
      await this.superAdminRepository.save({
        name:'imad',
        email: 'superAdmin@gmail.com',//password is: superAdmin123
        hashed_password: '$2b$10$s8lDzeYEqVX9ytw7FMl5re92OGzhXhuUE/fjJBJJOuvOvXP2rr8ta',
        active: true,
        manager: true,
        age:20, // very young
        location:'daraa/ibtaa'
      });
    }
  }catch {return 'already seeded'}
    return 'seeded successfully';
  }


}
