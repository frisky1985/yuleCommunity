# ── Build Stage ──
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
# 复制预构建的 seed 数据（由 scripts/prebuild-seed-data.ts 生成）
COPY seed-data/ ./seed-data/
RUN npm run build

# ── Runtime Stage ──
FROM node:22-alpine AS runtime

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/seed-data ./seed-data
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
