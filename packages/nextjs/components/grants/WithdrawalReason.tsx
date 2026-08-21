import { Fragment, useState } from "react";

// Builders wrote these by hand when withdrawing: a few words for some, a wall of PR links for
// others (the longest is ~5kB). They are the substance of the archive, so they render in full,
// but as plain React nodes — never dangerouslySetInnerHTML.
const CLAMP_AT = 400;

// Only http(s) is matched, so `javascript:` and `data:` can never end up in an href. Combined
// with React escaping every text node, that is the whole XSS surface here.
const URL_PATTERN = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]"'])/g;

const GITHUB_PR = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:pull|issues)\/(\d+)/;

/** GitHub links dominate these logs; collapsing them to `org/repo#123` makes a wall scannable. */
function prettyUrl(url: string) {
  const pr = url.match(GITHUB_PR);
  if (pr) return `${pr[1]}/${pr[2]}#${pr[3]}`;

  const bare = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return bare.length > 48 ? `${bare.slice(0, 48)}…` : bare;
}

/**
 * Truncate at the last whitespace before the limit. URLs contain no whitespace, so this can
 * never cut one in half and turn it into a dead link.
 */
function clampToWord(reason: string) {
  const cut = reason.slice(0, CLAMP_AT);
  const lastBreak = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf("\n"));
  return (lastBreak > 0 ? cut.slice(0, lastBreak) : cut).trimEnd();
}

const Linkified = ({ text }: { text: string }) => (
  <>
    {text.split(URL_PATTERN).map((part, index) =>
      // split() with a capturing group puts the delimiters at the odd indexes.
      index % 2 === 1 ? (
        <a
          key={index}
          href={part}
          title={part}
          target="_blank"
          rel="noreferrer nofollow ugc"
          className="text-primary hover:underline break-all"
        >
          {prettyUrl(part)}
        </a>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    )}
  </>
);

export const WithdrawalReason = ({ reason }: { reason: string }) => {
  const [expanded, setExpanded] = useState(false);

  if (!reason.trim()) {
    return <p className="m-0 text-sm text-base-content/40 italic">No reason given</p>;
  }

  const isLong = reason.length > CLAMP_AT;
  const shown = isLong && !expanded ? `${clampToWord(reason)}…` : reason;

  return (
    <div className="text-sm text-base-content/80 break-words">
      {shown.split(/\r?\n/).map((line, index) =>
        line.trim() ? (
          <p key={index} className="m-0 mb-1 last:mb-0 leading-relaxed">
            <Linkified text={line} />
          </p>
        ) : (
          <span key={index} className="block h-2" />
        ),
      )}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-1 font-mono text-xs text-base-content/50 hover:text-primary transition-colors"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};
