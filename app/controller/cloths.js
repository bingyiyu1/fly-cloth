/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';
const Controller = require('egg').Controller;
const _ = require('lodash');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ClothController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Cloth.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Cloth.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    let { length, weight, threads, storageDate, pattern_id, patternName } = ctx.request.body;
    let cloth;
    if (patternName) {
      const existsPattern = await ctx.model.Pattern.findOne({ where: { name: patternName } });
      pattern_id = pattern_id || (existsPattern && existsPattern.id);
    }
    if (pattern_id) {
      cloth = await ctx.model.Cloth.create({ length, weight, threads, storageDate, pattern_id });
    } else {
      cloth = await ctx.model.Cloth.create({ length, weight, threads, storageDate, pattern: {
        name: patternName,
      } }, {
        include: [ ctx.model.Pattern ],
      });
    }
    ctx.status = 201;
    ctx.body = cloth;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const cloth = await ctx.model.Cloth.findById(id);
    if (!cloth) {
      ctx.status = 404;
      return;
    }

    const updateBody = _.pick(ctx.request.body, [ 'length', 'weight', 'threads', 'storageDate', 'pattern_id' ]);

    await cloth.update(updateBody);
    ctx.body = cloth;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const cloth = await ctx.model.Cloth.findById(id);
    if (!cloth) {
      ctx.status = 404;
      return;
    }
    await cloth.destroy();
    ctx.status = 200;
  }
}

module.exports = ClothController;
