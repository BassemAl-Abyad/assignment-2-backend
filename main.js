// const path = require("node:path");

// console.log(path.sep);
// console.log(path.basename("foo/bar/baz/asdf/quux.html", ".html"));
// console.log(path.extname("foo/bar/baz/asdf/quux.html"));
// console.log(path.parse("foo/bar/baz/asdf/quux.html"));
// console.log(path.format({
//   root: "/",
//   dir: "/foo/bar/baz/asdf",
//   base: "quux.html",
//   ext: ".html",
//   name: "index"
// }));
// console.log(path.normalize("foo/bar/baz/asdf/quux.html"));
// console.log(path.join("foo", "../bar", "bas", "asdf", "quux.html"));
// console.log(path.isAbsolute("H:\\Route\Back-End\\C45 2\\Week 3\\Code")); //true
// console.log(path.isAbsolute("main.js")); //false
// console.log(path.relative("foo", "bar", "baz", "asdf", "main.js"));
// console.log(path.isAbsolute("main.js"));
// console.log(__dirname);
// console.log(__filename);

// const fs = require("node:fs");
// const fsPromise = require("node:fs/promises");

// read file

// fs.readFile("./txtfolder/test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("error reading file", err);
//   }
//   console.log(data);
// })

// try {
//   const data = fs.readFileSync("./txtfolder/test.txt", "utf-8");
//   console.log(data);
// } catch (err) {
//   console.log("error reading file", err);
// }

// fsPromise
//   .readFile("./txtfolder/test.txt", "utf-8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("error reading file", err);
//   });

// async function readFile() {
//   try {
//     const data = await fsPromise.readFile("./txtfolder/test.txt", "utf-8");
//     console.log(data);
//   } catch (err) {
//     console.log("error reading file", err);
//   }
// }
// readFile();

// write file

// fs.writeFile("./txtfolder/test.txt", "hello Bassem", "utf-8", (err) => {
//   if (err) throw err;
//   console.log("file written successfully");
// })

// fs.writeFileSync("./txtfolder/test.txt", "hello Bassem sync", "utf-8");

// append file

// fs.appendFile("./txtfolder/test.txt", "\nhello from append file", "utf-8", (err) => {
//   if (err) throw err;
//   console.log("file appended successfully");
// });

// remove file

// fs.unlink("./txtfolder/test.txt", (err) => {
//   if (err) throw err;
//   console.log("file deleted successfully");
// });

// check file exist

// console.log(fs.existsSync("/foo/bar/baz"));

const path = require("node:path");
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const os = require("node:os");
const EventEmitter = require("node:events");

// 1. Logs the current file path and directory.
function logCurrentPaths() {
  const file = __filename;
  const dir = __dirname;

  console.log("1. Log Current Paths:");
  console.log({
    File: file,
    Dir: dir,
  });
}

// 2. Takes a file path and returns its file name.
function getFileName(filePath) {
  return path.basename(filePath);
}

// 3. Builds a path from an object
function buildPathFromObject(pathObject) {
  return path.format(pathObject);
}

// 4. Returns the file extension from a given file path.
function getFileExtension(filePath) {
  return path.extname(filePath);
}

// 5. Parses a given path and returns its name and ext.
function parsePath(filePath) {
  const parsed = path.parse(filePath);
  return {
    Name: parsed.name,
    Ext: parsed.ext,
  };
}

// 6. Checks whether a given path is absolute.
function isPathAbsolute(filePath) {
  return path.isAbsolute(filePath);
}

// 7. Joins multiple segments
function joinSegments(...segments) {
  return path.join(...segments);
}

// 8. Resolves a relative path to an absolute one.
function resolveRelativePath(relativePath) {
  return path.resolve(relativePath);
}

// 9. Joins two paths.
function joinTwoPaths(path1, path2) {
  return path.join(path1, path2);
}

// 10. Deletes a file asynchronously. (fs/promises)
async function deleteFileAsync(filePath) {
  console.log(`\n10. Deleting file: ${filePath}`);
  try {
    await fsPromise.unlink(filePath);
    const fileName = path.basename(filePath);
    console.log(`Output: The ${fileName} is deleted.`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`Output: File not found: ${filePath}`);
    } else {
      console.error(`Output: Error deleting file: ${error.message}`);
    }
  }
}

// 11. Creates a folder synchronously. (fs)
function createFolderSync(folderPath) {
  console.log(`\n11. Creating folder synchronously: ${folderPath}`);
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    return "Success";
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

// 12. Create an event emitter that listens for a "start" event.
const welcomeEmitter = new EventEmitter();
function setupWelcomeEvent() {
  welcomeEmitter.on("start", () => {
    console.log("\n12. Event Emitter - Start:");
    console.log("Output: Welcome event triggered!");
  });
}

// 13. Emit a custom "login" event with a username parameter.
const loginEmitter = new EventEmitter();
function setupLoginEvent() {
  loginEmitter.on("login", (username) => {
    console.log(`\n13. Event Emitter - Login:`);
    console.log(`Output: User logged in: ${username}`);
  });
}

// 14. Reads a file synchronously and logs its contents. (fs)
function readFileSync(filePath) {
  console.log(`\n14. Reading file synchronously: ${filePath}`);
  try {
    const content = fs.readFileSync(filePath, "utf8");
    console.log(`Output: the file content => “${content.trim()}”`);
    return content;
  } catch (error) {
    console.error(`Output: Error reading file: ${error.message}`);
  }
}

// 15. Write asynchronously to a file. (fs/promises)
async function writeToFileAsync(filePath, content) {
  console.log(`\n15. Writing asynchronously to: ${filePath}`);
  try {
    await fsPromise.writeFile(filePath, content);
    console.log("Output: Async save completed.");
  } catch (error) {
    console.error(`Output: Error writing to file: ${error.message}`);
  }
}

// 16. Check if a directory exists. (fs)
function checkDirectoryExists(inputPath) {
  console.log(`\n16. Checking if directory exists: ${inputPath}`);
  try {
    // Check if the path exists AND if it is a directory
    const stats = fs.statSync(inputPath);
    return stats.isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false; // Path does not exist
    }
    throw error;
  }
}

// 17. Returns the OS platform and CPU architecture. (os)
function getOSInfo() {
  console.log("\n17. OS Information:");
  const info = {
    Platform: os.platform(),
    Arch: os.arch(),
  };
  console.log(`Output: {Platform: “${info.Platform}”, Arch: “${info.Arch}”}`);
  return info;
}

// Demo Execution

async function runDemo() {
  // creating files/folders needed for demo
  const testFolder = path.join(__dirname, "temp_test_folder");
  const notesFile = path.join(__dirname, "notes.txt");
  const asyncFile = path.join(__dirname, "async.txt");
  const deleteFile = path.join(__dirname, "file_to_delete.txt");

  // Create notes.txt for reading (Task 14)
  await fsPromise.writeFile(notesFile, "This is a note.\nLine 2.");
  // Create a file to be deleted (Task 10)
  await fsPromise.writeFile(deleteFile, "Delete me.");

  // 1. Path & Directory
  logCurrentPaths();

  // 2. Get File Name
  console.log("\n2. Get File Name:");
  console.log(
    `Input: /user/files/report.pdf, Output: "${getFileName(
      "/user/files/report.pdf"
    )}"`
  );

  // 3. Build Path from Object
  console.log("\n3. Build Path from Object:");
  console.log(
    `Input: { dir: "/folder", name: "app", ext: ".js"}, Output: “${buildPathFromObject(
      { dir: "/folder", name: "app", ext: ".js" }
    )}”`
  );

  // 4. Get File Extension
  console.log("\n4. Get File Extension:");
  console.log(
    `Input: /docs/readme.md, Output: “${getFileExtension("/docs/readme.md")}”`
  );

  // 5. Parse Path
  console.log("\n5. Parse Path:");
  console.log(
    `Input: /home/app/main.js, Output: `,
    parsePath("/home/app/main.js")
  );

  // 6. Is Absolute
  console.log("\n6. Is Path Absolute:");
  console.log(
    `Input: /home/user/file.txt, Output: ${isPathAbsolute(
      "/home/user/file.txt"
    )}`
  );

  // 7. Join Segments
  console.log("\n7. Join Segments:");
  console.log(
    `Input: "src","components", "App.js", Output: ${joinSegments(
      "src",
      "components",
      "App.js"
    )}`
  );

  // 8. Resolve Relative Path
  console.log("\n8. Resolve Relative Path:");
  console.log(
    `Input: ./index.js, Output (Full Path): ${resolveRelativePath(
      "./index.js"
    )}`
  );

  // 9. Join Two Paths
  console.log("\n9. Join Two Paths:");
  console.log(
    `Input: /folder1, folder2/file.txt, Output: ${joinTwoPaths(
      "/folder1",
      "folder2/file.txt"
    )}`
  );

  // 10. Delete File Async
  await deleteFileAsync(deleteFile);

  // 11. Create Folder Sync
  console.log(`Output: “${createFolderSync(testFolder)}”`);

  // 12. Event Emitter - Start
  setupWelcomeEvent();
  welcomeEmitter.emit("start");

  // 13. Event Emitter - Login
  setupLoginEvent();
  function emitLoginEvent(username) {
    loginEmitter.emit("login", username);
  }
  emitLoginEvent("Bassem");

  // 14. Read Sync
  readFileSync(notesFile);

  // 15. Write Async
  await writeToFileAsync(asyncFile, "Async save");

  // 16. Check Directory Exists
  console.log(`Output: ${checkDirectoryExists(testFolder)}`);
  console.log(
    `Output: ${checkDirectoryExists(notesFile)} (checking a file path)`
  );

  // 17. OS Info
  getOSInfo();

  // Cleanup (Delete created files/folders)
  await fsPromise.unlink(notesFile).catch(() => {});
  await fsPromise.unlink(asyncFile).catch(() => {});
  await fsPromise.rmdir(testFolder).catch(() => {});
}

runDemo();