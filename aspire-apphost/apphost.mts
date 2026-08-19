// Aspire TypeScript AppHost
// For more information, see: https://aspire.dev

import { createBuilder } from './.aspire/modules/aspire.mjs';

const builder = await createBuilder();

const sql = await builder.addConnectionString("database");
const storage = await builder.addConnectionString("storage");
const pinCode = await builder.addParameter("pin-code");

await builder.addJavaScriptApp('bun-api', '../src')
  .withRunScript('dev')
  .withBun()
  .withReference(sql)
  .withReference(storage)
  .withEnvironment("PIN_CODE", pinCode)
  .withHttpEndpoint({ port: 3000, isProxied: false });

await builder.build().run();
