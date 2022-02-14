import AppException from '../../app/exceptions/AppException.js';
import QueryFiltre from '../../app/helpers/QueryFiltre.js';
import fs from 'fs';

export default class BaseController {
  constructor(Model, populate = '') {
    this.Model = Model;
    this.populate = populate;
  }

  getAll = async (req, res, next) => {
    const filtredoc = new QueryFiltre(this.Model.find(), req.query)
      .filtre()
      .sort()
      .limitFields()
      .paginate();
    const doc = await filtredoc.query;
    const results = await filtredoc.query.countDocuments();
    if (!doc)
      return next(new AppException('Somthing wrong please try again', 400));
    res.status(202).json({
      status: 'success',
      results: results,
      data: {
        doc,
      },
    });
  };

  getOne = async (req, res, next) => {
    const doc = await this.Model.findById(req.params.id).populate(
      this.populate
    );
    if (!doc)
      return next(new AppException('Somthing wrong please try again', 400));
    res.status(202).json({
      status: 'success',
      data: {
        doc,
      },
    });
  };

  create = async (req, res, next) => {
    const doc = await this.Model.create(req.body);
    if (!doc)
      return next(new AppException('Somthing wrong please try again', 400));
    res.status(202).json({
      status: 'success',
      data: {
        doc,
      },
    });
  };

  update = async (req, res, next) => {

    const doc = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc)
      return next(new AppException('Somthing wrong please try again', 400));
    res.status(202).json({
      status: 'success',
      data: {
        doc,
      },
    });
  };

  delete = async (req, res, next) => {
    const doc = await this.Model.findById(req.params.id);
    if (!doc)
      return next(new AppException('Somthing wrong please try again', 400));
    res.status(202).json({
      status: 'success',
      data: {
        doc,
      },
    });
  };
}
