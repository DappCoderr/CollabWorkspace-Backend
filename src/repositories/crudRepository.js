export const crudRepository = (model) => {
  return {
    create: async (data) => model.create(data),
    update: async (id, newData) =>
      model
        .findByIdAndUpdate(id, newData, { new: true, runValidators: true })
        .exec(),
    delete: async (id) => model.findByIdAndDelete(id).exec(),
    getById: async (id) => model.findById(id).exec(),
    getAll: async () => model.find().exec(),
  };
};
