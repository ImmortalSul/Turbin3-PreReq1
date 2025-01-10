# Turbin3 Prereq Program

PS: The start of trust issues towards PDFs

This repository contains the **Turbin3 Prereq Program**, a Solana-based application built using Anchor Framework. The program allows users to complete specific tasks using predefined instructions and account structures.

---

## Features
- **Anchor Framework Integration**: Simplifies the interaction with Solana programs.
- **Account Management**: Uses a `prereq` account to store and process user-specific data.
- **Custom Instructions**: Supports methods like `complete` to trigger actions within the program.

---

## Prerequisites
Ensure you have the following installed on your system:

- Node.js (v16 or higher)
- Yarn or npm
- Anchor CLI (v0.26.0 or higher)
- Solana CLI (v1.10.0 or higher)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install Dependencies
```bash
yarn install
# OR
npm install
```

### 3. Build the Program
Compile the program using Anchor:
```bash
anchor build
```

### 4. Deploy the Program
Ensure you have a valid Solana wallet and deploy the program to a Solana cluster:

```bash
anchor deploy
```

### 5. Run the Client
Interact with the program using the provided client:

```bash
ts-node src/client.ts
```

---

## Program Structure

### 1. **IDL Definition**
The program's IDL (`interface definition language`) defines the structure of the program, including instructions, accounts, and types.

Example IDL snippet:
```typescript
export const IDL = {
  "version": "0.1.0",
  "name": "wba_prereq",
  "instructions": [
    {
      "name": "complete",
      "accounts": [
        { "name": "signer", "isMut": true, "isSigner": true },
        { "name": "prereq", "isMut": true, "isSigner": false }
      ],
      "args": [
        { "name": "github", "type": "string" }
      ]
    }
  ],
  "accounts": [
    {
      "name": "PrereqAccount",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "github", "type": "string" },
          { "name": "completionDate", "type": "i64" }
        ]
      }
    }
  ]
};
```

### 2. **Client Code**
The client interacts with the deployed Solana program via Anchor's `Program` class.

Example interaction:
```typescript
const program: Program<Turbin3Prereq> = new Program(IDL, programId, provider);

await program.methods
  .complete("your-github-username")
  .accounts({
    signer: keypair.publicKey,
    prereq: prereqKey,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

### 3. **Account Schema**
The `PrereqAccount` structure:
```typescript
export type PrereqAccount = {
  github: string;
  completionDate: number;
};
```

---

## Troubleshooting

### Common Errors

1. **Missing `complete` in `rpc` Property**
   - Ensure the IDL includes the `complete` instruction.
   - Verify the `IDL` matches the program's schema.

2. **`prereq` Does Not Exist in Resolved Accounts**
   - Verify the `accounts` object passed during the method call includes `prereq`.
   - Ensure `prereq` is correctly defined in the IDL and created during initialization.

3. **Type Errors**
   - Ensure all TypeScript types align with the program's IDL.
   - Use explicit type imports for `Program` and `Idl` when initializing the program.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- **Anchor Framework**: For simplifying Solana development.
- **Solana Community**: For excellent documentation and support.

