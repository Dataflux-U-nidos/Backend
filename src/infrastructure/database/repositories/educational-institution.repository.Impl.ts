import { EducationalInstitutionModel } from '../../../infrastructure';
import {
  EducationalInstitution,
  IEducationalInstitutionRepository,
} from '../../../domain';

export class EducationalInstitutionRepository
  implements IEducationalInstitutionRepository
{
  public async findAll(): Promise<EducationalInstitution[]> {
    const results = await EducationalInstitutionModel.find({});
    return results.map((doc) => ({
      _id: (doc._id as unknown as string).toString(),
      name: doc.name,
      location_l: doc.location_l,
      price_range: doc.price_range,
      aceptation_difficulty: doc.aceptation_difficulty,
      description: doc.description,
      link: doc.link,
      events: doc.events,
    }));
  }

  public async findById(id: string): Promise<EducationalInstitution | null> {
    const doc = await EducationalInstitutionModel.findById(id);
    if (!doc) return null;
    return {
      _id: doc._id as string,
      name: doc.name,
      location_l: doc.location_l,
      price_range: doc.price_range,
      aceptation_difficulty: doc.aceptation_difficulty,
      description: doc.description,
      link: doc.link,
      events: doc.events,
    };
  }

  public async create(
    data: Omit<EducationalInstitution, '_id'>,
  ): Promise<EducationalInstitution> {
    const doc = await EducationalInstitutionModel.create(data);
    return {
      _id: doc._id as string,
      ...data,
    };
  }

  public async update(
    _id: string,
    data: Partial<Omit<EducationalInstitution, '_id'>>,
  ): Promise<EducationalInstitution | null> {
    const doc = await EducationalInstitutionModel.findByIdAndUpdate(_id, data, {
      new: true,
    });
    if (!doc) return null;
    return {
      _id: doc._id as string,
      name: doc.name,
      location_l: doc.location_l,
      price_range: doc.price_range,
      aceptation_difficulty: doc.aceptation_difficulty,
      description: doc.description,
      link: doc.link,
      events: doc.events,
    };
  }

  public async delete(_id: string): Promise<boolean> {
    const result = await EducationalInstitutionModel.findByIdAndDelete(_id);
    return result !== null;
  }
}
