// export function directusErrorLogger(err: Partial<Error>) {
//   const timeStamp = new Date();
//   console.error(
//     err.errors
//       ? err.errors.map((x: { message: string }) => x.message).join("\t -- \n")
//       : err.message,
//     "\t --->|",
//     timeStamp.toUTCString(),
//   );
// }
