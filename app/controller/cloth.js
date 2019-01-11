/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';
const Controller = require('egg').Controller;

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
    let { length, weight, threads, patternId, patternName } = ctx.request.body;
    let cloth;
    if (patternName) {
      const existsPattern = await ctx.model.Pattern.findOne({ where: { name: patternName } });
      patternId = patternId || (existsPattern && existsPattern.id);
    }
    if (patternId) {
      cloth = await ctx.model.Cloth.create({ length, weight, threads, pattern_id: patternId });
    } else {
      cloth = await ctx.model.Cloth.create({ length, weight, threads, pattern: {
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
    const user = await ctx.model.Cloth.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.Cloth.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = ClothController;
