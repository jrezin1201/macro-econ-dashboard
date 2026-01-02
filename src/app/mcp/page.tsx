"use client";

import { useState } from "react";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";

interface MCPServer {
  name: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  useCase: string;
  installCommand: string;
  configExample: string;
  features: string[];
  documentation: string;
}

const mcpServers: MCPServer[] = [
  {
    name: "Filesystem MCP",
    description: "Access and read files from your local filesystem",
    category: "Data Access",
    difficulty: "Easy",
    useCase: "Read CSV files with market data, access local datasets",
    installCommand: "npx -y @modelcontextprotocol/server-filesystem",
    configExample: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/your/data"]
    }
  }
}`,
    features: [
      "Read local CSV/JSON files with financial data",
      "Access datasets stored on your computer",
      "Load custom economic indicators",
    ],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
  },
  {
    name: "Fetch MCP",
    description: "Make HTTP requests to any API endpoint",
    category: "API Integration",
    difficulty: "Easy",
    useCase: "Pull data from any financial API (Alpha Vantage, Polygon, etc.)",
    installCommand: "npx -y @modelcontextprotocol/server-fetch",
    configExample: `{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}`,
    features: [
      "Fetch from Alpha Vantage, Polygon.io, Quandl, etc.",
      "Access cryptocurrency APIs (CoinGecko, CoinMarketCap)",
      "Pull real-time market data from any REST API",
    ],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
  },
  {
    name: "PostgreSQL MCP",
    description: "Query PostgreSQL databases directly",
    category: "Database",
    difficulty: "Medium",
    useCase: "Access historical market data stored in your PostgreSQL database",
    installCommand: "npx -y @modelcontextprotocol/server-postgres",
    configExample: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost/market_data"
      ]
    }
  }
}`,
    features: [
      "Query tick data and OHLCV historical data",
      "Run complex SQL queries on financial datasets",
      "Access time-series data efficiently",
    ],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
  },
  {
    name: "SQLite MCP",
    description: "Query SQLite databases",
    category: "Database",
    difficulty: "Easy",
    useCase: "Access local market data stored in SQLite (great for backtest results)",
    installCommand: "npx -y @modelcontextprotocol/server-sqlite",
    configExample: `{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "--db-path",
        "/path/to/market_data.db"
      ]
    }
  }
}`,
    features: [
      "Perfect for storing backtest results",
      "Lightweight historical data storage",
      "Easy to export and share datasets",
    ],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite",
  },
  {
    name: "Google Drive MCP",
    description: "Access files from Google Drive",
    category: "Cloud Storage",
    difficulty: "Medium",
    useCase: "Read spreadsheets with portfolio data, research reports",
    installCommand: "npx -y @modelcontextprotocol/server-gdrive",
    configExample: `{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_CLIENT_ID": "your_client_id",
        "GDRIVE_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}`,
    features: [
      "Access Google Sheets with portfolio data",
      "Read research PDFs and documents",
      "Collaborate on shared financial models",
    ],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive",
  },
  {
    name: "GitHub MCP",
    description: "Access GitHub repositories and files",
    category: "Development",
    difficulty: "Easy",
    useCase: "Access trading algorithms, backtest code, financial models from repos",
    installCommand: "npx -y @modelcontextprotocol/server-github",
    configExample: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token"
      }
    }
  }
}`,
    features: [
      "Access trading strategies from GitHub repos",
      "Read financial modeling code",
      "Clone and analyze quant libraries",
    ],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
  },
];

const recommendedAPIs = [
  {
    name: "Alpha Vantage",
    description: "Free stock, forex, and crypto data API",
    url: "https://www.alphavantage.co/",
    apiKey: "Get free API key",
    useWithMCP: "Use with Fetch MCP to pull real-time and historical data",
  },
  {
    name: "Polygon.io",
    description: "Real-time and historical market data",
    url: "https://polygon.io/",
    apiKey: "Free tier available",
    useWithMCP: "Fetch stocks, options, forex, and crypto data",
  },
  {
    name: "CoinGecko",
    description: "Cryptocurrency prices and market data",
    url: "https://www.coingecko.com/en/api",
    apiKey: "No API key required for basic",
    useWithMCP: "Pull crypto prices, market caps, and historical data",
  },
  {
    name: "Yahoo Finance (via yfinance)",
    description: "Free historical stock data",
    url: "https://finance.yahoo.com/",
    apiKey: "No API key required",
    useWithMCP: "Use Filesystem MCP with downloaded CSV exports",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-400" />
      ) : (
        <ClipboardIcon className="h-4 w-4 text-white/60" />
      )}
    </button>
  );
}

export default function MCPPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredServers =
    selectedDifficulty === "All"
      ? mcpServers
      : mcpServers.filter((s) => s.difficulty === selectedDifficulty);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🔌 Model Context Protocol (MCP)
        </h1>
        <p className="text-xl text-white/60">
          Connect Claude Code to external data sources for financial analysis
        </p>
      </div>

      {/* What is MCP */}
      <section className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
        <h2 className="text-2xl font-bold text-white mb-4">What is MCP?</h2>
        <p className="text-white/80 mb-4">
          The <strong>Model Context Protocol (MCP)</strong> is an open standard that lets you
          connect Claude Code to external data sources like APIs, databases, and file systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">📊 Access Live Data</h3>
            <p className="text-sm text-white/70">
              Pull real-time market data from APIs like Alpha Vantage, Polygon, CoinGecko
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">💾 Query Databases</h3>
            <p className="text-sm text-white/70">
              Connect to PostgreSQL, SQLite databases with historical financial data
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">📁 Read Local Files</h3>
            <p className="text-sm text-white/70">
              Access CSV/JSON files with custom datasets and research
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recommended MCP Servers</h2>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-md border-0 bg-white/10 py-2 pl-3 pr-10 text-white focus:bg-white/20 focus:ring-2 focus:ring-blue-500 sm:text-sm"
          >
            <option value="All" className="bg-gray-900">
              All Difficulty
            </option>
            <option value="Easy" className="bg-gray-900">
              Easy
            </option>
            <option value="Medium" className="bg-gray-900">
              Medium
            </option>
            <option value="Advanced" className="bg-gray-900">
              Advanced
            </option>
          </select>
        </div>

        {/* MCP Server Cards */}
        <div className="space-y-6">
          {filteredServers.map((server) => (
            <div
              key={server.name}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{server.name}</h3>
                  <p className="text-white/60 mb-2">{server.description}</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {server.category}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        server.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-300"
                          : server.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {server.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Use Case:</strong> {server.useCase}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-white mb-2">Features:</p>
                <ul className="space-y-1">
                  {server.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-white mb-2">Installation:</p>
                <div className="relative">
                  <pre className="bg-black/40 rounded-lg p-3 text-sm text-green-400 overflow-x-auto">
                    {server.installCommand}
                  </pre>
                  <CopyButton text={server.installCommand} />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-white mb-2">
                  Configuration (claude_desktop_config.json):
                </p>
                <div className="relative">
                  <pre className="bg-black/40 rounded-lg p-3 text-sm text-blue-300 overflow-x-auto">
                    {server.configExample}
                  </pre>
                  <CopyButton text={server.configExample} />
                </div>
              </div>

              <a
                href={server.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                View Documentation →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended APIs */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Recommended Financial APIs</h2>
        <p className="text-white/60 mb-4">
          Use these APIs with the <strong>Fetch MCP</strong> server to pull live financial data
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedAPIs.map((api) => (
            <div
              key={api.name}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-2">{api.name}</h3>
              <p className="text-sm text-white/60 mb-3">{api.description}</p>
              <p className="text-xs text-white/50 mb-2">
                <strong>API Key:</strong> {api.apiKey}
              </p>
              <p className="text-xs text-white/50 mb-3">
                <strong>Use with MCP:</strong> {api.useWithMCP}
              </p>
              <a
                href={api.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Visit {api.name} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Setup Instructions */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Setup Guide</h3>
        <ol className="space-y-3 text-white/80">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span>
              <strong>Locate your config file:</strong> <br />
              <code className="text-xs bg-black/40 px-2 py-1 rounded">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </code>{" "}
              (macOS)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
              2
            </span>
            <span>
              <strong>Add MCP server configs</strong> using the examples above
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
              3
            </span>
            <span>
              <strong>Restart Claude Code</strong> to load the new servers
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
              4
            </span>
            <span>
              <strong>Ask Claude</strong> to fetch data from your connected sources!
            </span>
          </li>
        </ol>
      </section>

      {/* Learn More */}
      <div className="text-center text-sm text-white/40">
        <p>
          Learn more about MCP:{" "}
          <a
            href="https://modelcontextprotocol.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            modelcontextprotocol.io
          </a>
        </p>
      </div>
    </div>
  );
}
